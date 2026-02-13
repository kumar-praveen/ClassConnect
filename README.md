# ClassConnect – MERN Stack Learning Management System

ClassConnect is a full‑stack **Learning Management System (LMS)** built with the **MERN stack**  
(**MongoDB, Express.js, React.js, Node.js**). It connects **instructors** and **students** on a single platform where instructors can create and manage courses with video lectures, and students can enroll and learn at their own pace.

---

## ✨ Features

### Authentication & Roles
- User registration and login using email and password
- Secure password storage with hashing (e.g., bcrypt)
- Role‑based access: **Student** and **Instructor**
- Profile page with avatar, bio, role, and email

### Instructor Features
- Instructor dashboard with quick stats
- Create, edit, and delete courses
- Add detailed course information:
  - Title, subtitle, description
  - Category, level (Beginner / Medium / Advance)
  - Course price (INR)
  - Course thumbnail
- Add, edit, and remove lectures with:
  - Lecture title
  - Video URL
  - Public ID (for cloud storage)
  - Free preview flag
- Publish / Unpublish courses
- View enrolled students per course (via DB / reports)

### Student Features
- Browse all **published** courses
- View course details and preview lectures
- Enroll into courses
- Dashboard with:
  - Enrolled courses
  - Basic activity stats (e.g., active courses, upcoming deadlines placeholder)
- Watch course lectures from inside the app

### Under the Hood
- RESTful API using **Express + Node**
- MongoDB data modeling with **Mongoose**
- Clean, responsive UI built with **React** (SPA)
- Role‑based route protection on frontend and backend
- Reusable components for forms, cards, dashboards

---

## 🏗️ Tech Stack

**Frontend**
- React (SPA – likely with Vite or CRA)
- React Router
- CSS framework / custom styling (e.g., Bootstrap / Tailwind / custom)

**Backend**
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- JSON Web Tokens (JWT) for auth (recommended)

**Database**
- MongoDB

---

## 📁 Project Structure (example)

```bash
classconnect/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
└── server/                 # Node/Express backend
    ├── models/
    │   ├── User.model.js
    │   ├── Course.model.js
    │   └── Lecture.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── course.routes.js
    │   └── lecture.routes.js
    ├── controllers/
    ├── middleware/
    ├── config/
    ├── server.js / index.js
    └── package.json