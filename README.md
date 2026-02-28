# Blog-Forge

A full-stack blog application built with **Express.js**, **MySQL**, and **React**. Users can sign up, write and publish blog posts, view a public feed, search for other authors, and manage their own profiles.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
  - [ERD Summary](#erd-summary)
  - [Relational Mapping](#relational-mapping)
  - [Design Notes](#design-notes)
  - [Diagrams](#diagrams)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment & Configuration](#environment--configuration)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Known Issues & Notes](#known-issues--notes)

---

## Features

- User registration and login
- Write and publish blog posts
- Public feed showing all posts with author names
- Author profile pages with age calculation from date of birth
- Edit first name and date of birth on your own profile
- Delete your own account
- Search for users by first name
- Protected routes — write, profile, and search pages require login
- Session persisted in localStorage

---

## Tech Stack

### Backend
- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [mysql2](https://github.com/sidorares/node-mysql2)
- [cors](https://github.com/expressjs/cors)

### Frontend
- [React 18](https://react.dev)
- [React Router DOM v6](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [Tailwind CSS v3](https://tailwindcss.com)
- [Vite](https://vitejs.dev)

### Database
- MySQL (local via XAMPP / phpMyAdmin or cloud via Railway)

---

## Project Structure

```
Blog/
├── Backend/
│   └── src/
│       ├── DB/
│       │   └── connection.db.js       # MySQL connection
│       ├── modules/
│       │   ├── auth/
│       │   │   ├── auth.controller.js
│       │   │   └── auth.service.js    # signup, login
│       │   ├── blog/
│       │   │   ├── blog.controller.js
│       │   │   └── blog.service.js    # createBlog, listBlogs
│       │   └── user/
│       │       ├── user.controller.js
│       │       └── user.service.js    # getProfile, search, update, delete
│       ├── app.controller.js          # Express app bootstrap
│       └── index.js                   # Entry point
│
└── Frontend/
    └── Blog-Forge/
        └── src/
            ├── context/
            │   ├── AuthContext.jsx
            │   ├── BlogContext.jsx
            │   └── UserContext.jsx
            ├── pages/
            │   ├── Home.jsx
            │   ├── Login.jsx
            │   ├── Signup.jsx
            │   ├── WriteBlog.jsx
            │   ├── Profile.jsx
            │   └── SearchUsers.jsx
            ├── components/
            │   ├── Navbar.jsx
            │   ├── BlogCard.jsx
            │   └── ProtectedRoute.jsx
            ├── utils/
            │   └── api.js             # Axios instance
            ├── App.jsx
            ├── main.jsx
            └── index.css
```

---

## Database Design

### ERD Summary

**USER**

| Attribute    | Notes                                   |
|--------------|-----------------------------------------|
| id           | Primary Key                             |
| firstName    | Part of composite `name` attribute      |
| middleName   | Part of composite `name` attribute      |
| lastName     | Part of composite `name` attribute      |
| DOB          | Date of Birth                           |
| age          | Derived attribute (calculated from DOB) |
| gender       |                                         |
| email        |                                         |
| confirmEmail |                                         |
| phone        | Multivalued attribute                   |
| createdAt    |                                         |
| updatedAt    |                                         |

**Blog**

| Attribute | Notes       |
|-----------|-------------|
| id        | Primary Key |
| title     |             |
| content   |             |
| createdAt |             |
| updatedAt |             |

**Relationship:** A `USER` can create one or many `Blog` posts (1-to-many relationship).

---

### Relational Mapping

**USERS**

| Column       | Constraint       |
|--------------|------------------|
| id           | Primary Key (PK) |
| firstName    |                  |
| middleName   |                  |
| lastName     |                  |
| DOB          |                  |
| gender       |                  |
| email        |                  |
| confirmEmail |                  |
| createdAt    |                  |
| updatedAt    |                  |

> `age` is a derived attribute and is not stored as a column — it is computed from `DOB` at query level.

**USERS_Phone**

Separate table created because `phone` is a multivalued attribute.

| Column | Constraint                          |
|--------|-------------------------------------|
| phone  |                                     |
| userId | Foreign Key referencing `USERS(id)` |

**Blog**

| Column    | Constraint                          |
|-----------|-------------------------------------|
| id        | Primary Key (PK)                    |
| title     |                                     |
| content   |                                     |
| createdAt |                                     |
| updatedAt |                                     |
| authorId  | Foreign Key referencing `USERS(id)` |

---

### Design Notes

- The `phone` attribute is multivalued, so it is extracted into its own table `USERS_Phone` linked back to `USERS` via a foreign key.
- The `name` attribute is composite, so it is broken down into `firstName`, `middleName`, and `lastName` as individual columns.
- The `age` attribute is derived and is calculated at the query level from `DOB` rather than stored.
- The 1-to-many relationship between `USERS` and `Blog` is represented by the `authorId` foreign key in the `Blog` table.

---

### Diagrams

**ERD**

<img width="968" height="709" alt="ERD" src="https://github.com/user-attachments/assets/1f4f0e19-a5fc-4bb5-8034-6ce43e1431c0" />

**Relational Mapping**

<img width="752" height="704" alt="Mapping" src="https://github.com/user-attachments/assets/f839a9ef-bf72-4b44-91fc-1ab49e24b108" />

---

## Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [npm](https://npmjs.com) v9 or higher
- [XAMPP](https://www.apachefriends.org) or any MySQL server running locally

---

## Getting Started

### Database Setup

1. Start your MySQL server (e.g. via XAMPP).
2. Open phpMyAdmin at `http://localhost/phpmyadmin`.
3. Create a database named `Blog App`.
4. Create the `users` table:

```sql
CREATE TABLE users (
  u_id           INT AUTO_INCREMENT PRIMARY KEY,
  u_firstName    VARCHAR(100),
  u_middleName   VARCHAR(100),
  u_lastName     VARCHAR(100),
  u_email        VARCHAR(255) UNIQUE NOT NULL,
  u_password     VARCHAR(255) NOT NULL,
  u_DOB          DATE,
  u_confirmEmail TINYINT DEFAULT 0,
  u_createdAt    DATETIME DEFAULT CURRENT_TIMESTAMP,
  u_updatedAt    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  gender         VARCHAR(10)
);
```

5. Create the `users_phone` table:

```sql
CREATE TABLE users_phone (
  phone   VARCHAR(20),
  userId  INT,
  FOREIGN KEY (userId) REFERENCES users(u_id) ON DELETE CASCADE
);
```

6. Create the `blogs` table:

```sql
CREATE TABLE blogs (
  b_id         INT AUTO_INCREMENT PRIMARY KEY,
  b_title      VARCHAR(255) NOT NULL,
  b_content    TEXT NOT NULL,
  b_author_id  INT,
  b_createdAt  DATETIME DEFAULT CURRENT_TIMESTAMP,
  b_updatedAt  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (b_author_id) REFERENCES users(u_id) ON DELETE CASCADE
);
```

---

### Backend Setup

```bash
cd Blog/Backend
npm install
```

Update `src/DB/connection.db.js` with your MySQL credentials if needed:

```js
export const connection = mySql2.createConnection({
  database: "Blog App",
  port: "3306",
  password: "",       // your MySQL root password
  user: "root",
});
```

Start the backend:

```bash
node src/index.js
```

The server runs on `http://localhost:3000`.

---

### Frontend Setup

```bash
cd Blog/Frontend/Blog-Forge
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

Make sure the backend is running before using the app.

---

## Environment & Configuration

The frontend communicates with the backend via `src/utils/api.js`:

```js
const api = axios.create({
  baseURL: "http://localhost:3000",
});
```

Change `baseURL` to your deployed backend URL when deploying to production.

---

## API Reference

### Auth

| Method | Endpoint      | Body                                                              | Description     |
|--------|---------------|-------------------------------------------------------------------|-----------------|
| POST   | /auth/signup  | firstName, middleName, lastName, email, password, confirmPassword | Register a user |
| POST   | /auth/login   | email, password                                                   | Login a user    |

### Blog

| Method | Endpoint | Body                     | Description         |
|--------|----------|--------------------------|---------------------|
| POST   | /blog    | title, content, authorId | Create a blog post  |
| GET    | /blog    | —                        | List all blog posts |

### User

| Method | Endpoint          | Body / Params     | Description          |
|--------|-------------------|-------------------|----------------------|
| GET    | /user/:id/profile | id (param)        | Get user profile     |
| GET    | /user/search      | searchKey (query) | Search users by name |
| PATCH  | /user/:id         | firstName, DOB    | Update user profile  |
| DELETE | /user/:id         | id (param)        | Delete a user        |

---

## Deployment

### Recommended Stack

| Layer    | Service                         |
|----------|---------------------------------|
| Frontend | [Vercel](https://vercel.com)    |
| Backend  | [Railway](https://railway.app)  |
| Database | Railway MySQL                   |

### Steps

1. Export your local database from phpMyAdmin and import it into a Railway MySQL instance.
2. Update `connection.db.js` with the Railway MySQL credentials.
3. Add a `vercel.json` to the backend root:

```json
{
  "version": 2,
  "builds": [{ "src": "src/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/index.js" }]
}
```

4. Deploy the backend to Vercel or Railway.
5. Update `src/utils/api.js` in the frontend with the deployed backend URL.
6. Deploy the frontend to Vercel.

---

## Known Issues & Notes

- Passwords are stored in plain text. In production you should hash passwords using [bcrypt](https://github.com/kelektiv/node.bcrypt.js) before storing them.
- There is no JWT authentication. After login the raw user object is stored in localStorage. A proper implementation should use signed tokens.
- The `listBlogs` endpoint returns HTTP status `201` instead of `200` — this is a minor backend bug that does not affect functionality.
- CORS is enabled globally with `cors()`. In production you should restrict it to your frontend domain only:
