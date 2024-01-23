const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/user.schema");
const logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.mongoDB);
}
const indexRouter = require("./routes/index");

const app = express();

//cors
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://blogposter.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: false,
    // cookie: { secure: true, sameSite: 'none' },
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

//passport LS
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async function (username, password, done) {
      try {
        const user = await User.findOne({ username: username });

        if (!user) {
          console.log("Incorrect username.");
          return done(null, false);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          console.log("Incorrect password.", password, user.password);
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log("err");
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use("/", indexRouter);

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", `${baseUrl}`);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

const port = 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

module.exports = app;
