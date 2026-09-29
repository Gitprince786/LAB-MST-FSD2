# RBAC Authentication Web Project

A React + Vite application demonstrating role-based access control, protected routes, and JWT-style authentication handling in the frontend.

## Overview

This project showcases how a web app can restrict access based on a user's role. Authenticated users can access pages that are allowed for their role, while unauthorized users are redirected to an access-denied page.

## Features

- Login flow for role-based authentication
- Token-based authentication simulation
- Protected routes for authenticated users
- Role-based route guards for Admin, Editor, and Viewer
- Responsive UI with navbar and sidebar
- Fake backend for authentication and authorization logic
- Axios-based service layer

## Tech Stack

- React
- Vite
- React Router DOM
- Axios
- JavaScript
- CSS

## Project Structure

```text
RBAC_Authentication_Web_Project/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

From the project folder, run:

```bash
npm install
```

## Run the App

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173/
```

If port 5173 is busy, Vite will automatically choose another available port.

## How It Works

1. The user logs in with a valid account.
2. A token is stored locally in the browser.
3. Protected routes check whether the user is authenticated.
4. Role-based guards verify whether the user has permission to access a page.
5. Unauthorized access is redirected to the access-denied screen.

## Roles

- Admin: full access to protected and admin-only pages
- Editor: access to editing-related pages
- Viewer: read-only access

## Future Improvements

- Connect to a real backend API
- Add refresh-token support
- Improve security and storage handling
- Add more role-based features
- Enhance the UI and accessibility

## Author

Built as a frontend practice project for learning RBAC and route protection with React and Vite.