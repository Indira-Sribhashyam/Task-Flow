# Team Collaboration Board

A full-stack mini Trello-style application built with Next.js, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based login and registration, password hashing with bcrypt.
- **Task Management**: Create, read, update, and delete tasks (CRUD).
- **Kanban Board**: Tasks are organized into three columns (`To Do`, `In Progress`, `Done`).
- **Authorization**: Only the creator of a task can edit or delete it.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Axios, Context API
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd team-collaboration-board
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`. 
Register a new user account to access the dashboard.

---

## Deployment Strategy

### Backend (Render / Railway)
1. Push your code to GitHub.
2. Sign up on [Render](https://render.com/) or [Railway](https://railway.app/).
3. Create a new Web Service and link it to your GitHub repository.
4. Set the Root Directory to `backend` (if supported) OR configure the Build/Start commands:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add the Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
6. Deploy.

### Frontend (Vercel)
1. Sign up on [Vercel](https://vercel.com).
2. Create a new project and import your GitHub repository.
3. Edit the project configuration to set the **Root Directory** to `frontend`.
4. Add the Environment Variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend URL (e.g., `https://my-backend.onrender.com`).
5. Click **Deploy**.

---

## Project Structure

```text
├── backend
│   ├── src
│   │   ├── config       # DB Connection
│   │   ├── controllers  # Route Logic (Auth, Tasks)
│   │   ├── middleware   # JWT Auth Protection
│   │   ├── models       # Mongoose Schemas (User, Task)
│   │   ├── routes       # Express Routers
│   │   ├── index.ts     # Entry Point
│   └── package.json
└── frontend
    ├── src
    │   ├── app          # Next.js Pages & Layouts (Login, Register, Dashboard)
    │   ├── components   # Reusable UI (TaskCard, TaskModal)
    │   ├── context      # Global State (Auth, Tasks)
    │   ├── lib          # Axios Config
    │   ├── types        # TypeScript Interfaces
    └── package.json
```
