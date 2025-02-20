# PlaytPlus Task Manager App

# 🚀 Overview
The PlaytPlus Task Manager App is a web-based application designed to help users manage their tasks efficiently. It provides features like task creation, updating, deletion, and tracking progress. The app ensures a smooth and intuitive user experience for managing daily tasks.

# 🛠 Tech Stack
The application is built using the following technologies:

Frontend: React.js, Redux, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JWT (JSON Web Token)
Other Tools: Axios, Nodemon, bcrypt.js

# ✨ Features
✔️ User Authentication (Sign Up, Login, Logout)

✔️ Create, Read, Update, and Delete (CRUD) tasks

✔️ Task categorization and priority management

✔️ Due date and status tracking

✔️ Responsive UI with Tailwind CSS

✔️ Secure API endpoints with JWT authentication

✔️ Error handling and validation

✔️ Add pagination and infinite scroll for large task lists.

✔️ Deploy the app to a cloud platform (e.g., Vercel)

# 🔧 Prerequisites
Ensure you have the following installed:

Node.js (v14 or later)
MongoDB (local or cloud instance)
Git

# 📥 Installation
1.Clone the repository

git clone https://github.com/pranitkarkera/playtplus-taskmanager-app.git
cd playtplus-taskmanager-app

2.Install dependencies
npm install

3.Set up environment variables
Create a .env file in the root directory and add the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

4.Run the application
npm start

5.Access the app
Open http://localhost:5000 in your browser.

# 📂 Project Structure

```
playtplus-taskmanager-app/
│── backend/                # Backend (Node.js + Express)
│── frontend/               # Frontend (React.js)
│── models/                 # Database models (MongoDB)
│── routes/                 # API routes
│── controllers/            # Business logic
│── middleware/             # Authentication, error handling
│── public/                 # Static assets
│── .env                    # Environment variables
│── package.json            # Dependencies
│── README.md               # Documentation
```
