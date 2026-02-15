## Blog API
This is a simple RESTful API for managing users and blog posts, built with Hapi.js, MongoDB, and JWT authentication. It allows users to register, log in, create blog posts, update or delete their own posts, and read all blog posts.

## Features
	•	User registration and login
	•	JWT-based authentication with cookies
	•	Users can:
	•	Create blog posts
	•	Update or delete their own posts
	•	All users (authenticated or not) can read all blog posts
	•	Logout functionality

## API Endpoints

### Auth / Users

| Method | Endpoint            | Auth | Description |
|--------|-------------------|------|-------------|
| POST   | `/auth/register`   | No   | Register a new user |
| POST   | `/auth/login`      | No   | Log in and receive JWT cookie |
| POST   | `/auth/logout`     | No   | Log out (clears cookie) |
| GET    | `/auth/me`         | Yes  | Get currently logged-in user info |
| PUT    | `/auth/me`         | Yes  | Update your own user info |
| DELETE | `/auth/me`         | Yes  | Delete your own account |

### Blog Posts

| Method | Endpoint              | Auth | Description |
|--------|---------------------|------|-------------|
| GET    | `/blogposts`        | No   | Get all blog posts |
| POST   | `/blogposts`        | Yes  | Create a new blog post (author set automatically) |
| GET    | `/blogposts/{id}`   | No   | Get a specific blog post by ID |
| PUT    | `/blogposts/{id}`   | Yes  | Update your own blog post |
| DELETE | `/blogposts/{id}`   | Yes  | Delete your own blog post |

## Notes
	•	The author field is automatically set to the logged-in user’s id when creating a blog post.
	•	Only the author of a blog post can update or delete it.
	•	Anyone (authenticated or not) can read all blog posts.
	•	JWT tokens are stored in a secure cookie named jwt.

## Dependencies
	•	@hapi/hapi
	•	@hapi/jwt
	•	@hapi/cookie
	•	mongoose
	•	bcrypt
	•	dotenv
	•	joi

## Installation
	1.	Clone the repository:
    2. Install dependencies:
    3.	Create a .env file with the following variables:
        DATABASE=<your-mongodb-connection-string>
        JWT_SECRET=<your-secret-key>
        COOKIE_PASSWORD=<cookie-encryption-password>
    4. Start the server: npm run start

Server runs at http://localhost:5001