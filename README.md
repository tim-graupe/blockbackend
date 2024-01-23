# Blog App Backend (MERN) with Passport-Local Authentication

This repository contains the backend code for a Blog App built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with Passport-Local for authentication.

## Features

### 1. **MongoDB Integration**

- The backend uses MongoDB as the database to store blog posts, comments, and user information.
- Mongoose is utilized as an ODM (Object Data Modeling) library for MongoDB.

### 2. **Express Server**

- The server is implemented using Express.js, providing a robust and scalable backend framework.
- Express routes are organized to handle CRUD operations for blog posts and comments.

### 3. **Passport-Local Authentication**

- Passport-Local strategy is implemented for user authentication.
- Users can register, log in, and log out securely using Passport-Local.

### 4. **API Endpoints**

- The backend defines RESTful API endpoints to perform operations on blog posts and comments.
- CRUD operations (Create, Read, Update, Delete) are implemented for both blog posts and comments.

### 5. **Middleware for Authorization**

- Middleware functions are used to ensure that only authenticated users can perform certain actions, such as creating a new blog post or leaving a comment.

### 6. **Environmental Variables**

- Sensible information such as database connection strings and secret keys are stored as environmental variables for security.

## Technologies Used

- **Node.js**: The backend is powered by Node.js, providing an efficient and non-blocking runtime.
- **Express.js**: The server is built using Express.js, simplifying the creation of APIs.
- **MongoDB with Mongoose**: MongoDB is used as the database, and Mongoose is utilized for object modeling.
- **Passport.js**: Passport-Local is integrated for user authentication.
- **Bcrypt.js**: Bcrypt is used for hashing passwords, enhancing security.
- **Express Validator**: Input validation is implemented using Express Validator to ensure data integrity.

## Getting Started

To run the backend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/tim-graupe/blogbackend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environmental variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   MongoDB=your_mongodb_connection_string
   secret=your_secret_key
   ```

   Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_secret_key` with a secret key for Passport-Local.

4. Run the server:

   ```bash
   npm start
   ```

   The server will start on [http://localhost:4000](http://localhost:4000).

Feel free to explore and enhance the backend based on your requirements. Ensure that the [frontend](https://github.com/tim-graupe/blogfrontend) is configured to connect to this backend for a complete Blog App experience!