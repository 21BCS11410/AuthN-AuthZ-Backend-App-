# Authentication App Backend

This is the backend of an Authentication application built using the MERN (MongoDB, Express, React, Node.js) stack. This backend handles user authentication and authorization, allowing users to log in, sign up, and access protected routes.

## Features

- User authentication (Login & Signup)
- Role-based access control
- Protected routes for different user roles (Student, Admin)

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/Authentication-app-backend.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGODB_URL="mongodb://localhost:27017/NewDBofAuthApp"
   JWT_SECRET=your_jwt_secret_key
   ```

## Running the Server

Start the development server with:

```sh
npm run dev
```

The backend will be running on `http://localhost:3000` by default.

## API Endpoints

### Base URL: `/api/v1`

| Method | Endpoint   | Description                                                 |
| ------ | ---------- | ----------------------------------------------------------- |
| GET    | `/test`    | Test route for authentication                               |
| GET    | `/student` | Protected route for students (Requires auth & student role) |
| GET    | `/admin`   | Protected route for admins (Requires auth & admin role)     |

