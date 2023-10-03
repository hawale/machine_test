# Node.js Machine Test Application

**Version:** 1.0.0

## Description

The Node.js Machine Test Application is a web application built with Express.js and MongoDB. It is designed to effortlessly manage and display product listings.


## Getting Started

### Prerequisites

Before you can run the Node.js Machine Test Application, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/): JavaScript runtime environment
- [npm](https://www.npmjs.com/): Node Package Manager
- [MongoDB](https://www.mongodb.com/): NoSQL database (Make sure it's running locally or update the connection URI accordingly)

### Installation

Follow these steps to set up the application:

1. Clone the GitHub repository:

   git clone https://github.com/hawale/machine_test.git


2. Navigate to the project directory:

cd machine_test/server

3. Install the project dependencies:

npm install

4. Create a .env file in the project root directory and add the following environment variables:

MONGO_HOST=mongodb://127.0.0.1:27017/machine_task
MONGO_PORT=27017
JWT_SECRET=example
PORT=3200
Update the values as needed.

## Running the Application

To start the Node.js Machine Test Application, use one of the following npm scripts:

Run in production mode:

```npm start```

Run in development mode with nodemon (automatically restarts on code changes):

```npm run dev```

The application will be accessible at http://localhost:3200.

## Usage

The Node.js Machine Test Application provides the following API endpoints for managing product listings:

## API Endpoints

/api/signup
Description: Register a new user.
Method: POST
Example Usage: Use this endpoint to create a new user account.
/api/login
Description: Authenticate a user and receive a JWT token.
Method: POST
Example Usage: Use this endpoint to log in and receive an authentication token.
You can use tools like Postman or curl to interact with these endpoints.

License
This project is licensed under the ISC License - see the LICENSE file for details.

Contact
For any inquiries or feedback, please contact:

Harshal Awale
GitHub: https://github.com/hawale
Issues: Report Issues
