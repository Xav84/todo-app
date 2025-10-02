# 📝 Todo App

![GitHub repo size](https://img.shields.io/github/repo-size/Xav84/todo-app?color=blue)
![GitHub last commit](https://img.shields.io/github/last-commit/Xav84/todo-app?color=green)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A simple and modern **Task Manager** built with **React (frontend)** and **Express (backend)**.  
This app allows you to create, edit, complete, filter, and delete todos while persisting them in a local JSON file.

---

## ✨ Features

- ➕ Add new todos with title & description  
- ✏️ Edit existing todos  
- ✅ Mark todos as completed / active  
- 🔍 Filter tasks (All / Completed / Active)  
- 🗑️ Delete tasks with confirmation modal  
- 💾 Data persistence using a JSON file (backend storage)  
- 🎨 Clean and responsive UI with TailwindCSS  

---

## 🚀 Tech Stack

**Frontend**  
- ⚛️ React (Vite)  
- 🎨 TailwindCSS  
- 🖼️ React Icons  

**Backend**  
- 🟢 Node.js + Express  
- 📂 File system (todos.json for storage)  

---

## 📸 Screenshots

> *(Add screenshots here — you can drag and drop images into this README after uploading them to GitHub)*

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

2️⃣ Backend setup
cd backend
npm install
npm start

3️⃣ Frontend setup
cd frontend
npm install
npm run dev

📂 Project Structure
todo-app/
│── backend/          # Express API
│   ├── server.js     # API routes & logic
│   └── todos.json    # Local storage for todos
│
│── frontend/         # React app (Vite)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── contexts/     # React Context + Reducer
│   │   └── App.jsx       # Main app
│   └── package.json
│
└── README.md
```
## ⚡ API Endpoints
- **GET** `/todos` → Get all todos  
- **POST** `/todos` → Add a new todo  
- **PUT** `/todos/:id` → Update a todo  
- **DELETE** `/todos/:id` → Delete a todo  
- **GET** `/todos/count` → Get total count  


📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by Xavier Gratton
 🚀
