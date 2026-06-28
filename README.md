# TaskFlow Frontend

A React + Vite frontend for the TaskFlow todo application. This project uses Tailwind CSS, React Router, Context API, and Axios to connect to a Node/Express backend.

## Features

- User authentication with login and register pages
- Token-based auth using JWT stored in `localStorage`
- Protected todo screen after login
- Create, read, update, and delete todos
- Todo completion toggling
- Responsive layout with Tailwind CSS

## Project structure

- `src/api.js` — Axios instance with Authorization header support
- `src/contexts/AuthContext.jsx` — authentication state and user persistence
- `src/contexts/TodoContext.jsx` — todo CRUD state and backend syncing
- `src/pages/LoginPage.jsx` — login page
- `src/pages/RegisterPage.jsx` — register page
- `src/components/TodoApp.jsx` — main todo screen
- `src/components/NavBar.jsx` — navigation and logout
- `src/components/ProtectedRoute.jsx` — guarded route for authenticated users

## Development setup

1. Install frontend dependencies:

```bash
cd /home/jishu/Documents/Works/project/To-do-frontend
npm install
```

2. Configure the backend API URL.

The app defaults to the deployed Render backend:

```text
https://to-do-backend-n09w.onrender.com/api
```

For a different backend, create `.env.local`:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the backend server in your backend folder first if you are running it locally:

```bash
cd /path/to/to-do-backend
npm install
npm run dev
```

4. Start the frontend:

```bash
cd /home/jishu/Documents/Works/project/To-do-frontend
npm run dev
```

5. Open the app in the browser at:

```text
http://localhost:5175/
```

## Backend API assumptions

The frontend expects the backend to expose these routes:

- `POST /api/users/register` — create user and return JWT
- `POST /api/users/login` — login and return JWT
- `GET /api/todos` — retrieve todos for authenticated user
- `POST /api/todos` — create a new todo
- `PUT /api/todos/:id` — update a todo
- `DELETE /api/todos/:id` — delete a todo

If your backend runs on a different host or port, set `VITE_API_BASE_URL` in `.env.local` or in your frontend hosting provider's environment variables.

## Notes

- The app stores the JWT token and user metadata in `localStorage`.
- The todo screen is protected and will redirect to `/login` if the user is not authenticated.
- Register first, then login to access todos.
