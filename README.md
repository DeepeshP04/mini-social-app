# Mini Social Post Application

A full-stack social posting application built with React, Vite, Express, MongoDB, and Cloudinary. Users can sign up, log in, create posts, upload images, like posts, and add comments.

## Features

- User signup and login with JWT authentication
- Protected feed route for authenticated users
- Create text-only or image-based posts
- Upload images to Cloudinary
- Like and unlike posts
- Comment on posts
- Responsive UI with React Router

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- Cloudinary for image storage

## Project Structure

```text
mini_social_post_application/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── package.json
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or above)
- npm
- MongoDB database
- Cloudinary account

## Environment Variables

Create a `.env` file inside the `backend` folder with the following values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file inside the `frontend` folder with:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

1. Clone the repository
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

## Running the Project

### Start the backend

```bash
cd backend
npm run dev
```

The backend server will run on:

```text
http://localhost:5000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend development server will run on:

```text
http://localhost:5173
```

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT token

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a post (requires authentication)
- `POST /api/posts/:id/like` - Like or unlike a post (requires authentication)
- `POST /api/posts/:id/comments` - Add a comment to a post (requires authentication)

## Notes

- Post creation supports either text, an image, or both.
- Images are uploaded to Cloudinary and stored as public URLs.
- The frontend protects the feed page and redirects unauthenticated users to login.

## Default App Flow

1. User signs up or logs in.
2. JWT token is stored in localStorage.
3. User can create posts and upload images.
4. Feed page displays all posts with likes and comments.