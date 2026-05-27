# Quiz Builder Application

A full-stack quiz management application built with Node.js/Express on the backend and React/TypeScript on the frontend.

---

## 1. Database Setup

The backend application uses **SQLite** combined with **Prisma ORM** as a lightweight relational database, so **no external database installation** (like PostgreSQL or MongoDB) is required.

The SQLite database file will be automatically created and initialized via Prisma migrations in the backend directory upon the first server launch.

---

## 2. How to Start the Project

Make sure you have Node.js installed on your machine:

:contentReference[oaicite:0]{index=0}

### Start the Backend Server

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server in development mode:

```bash
npm run dev
```

The backend will be running at:

```txt
http://localhost:3000
```

---

### Start the Frontend Application

1. Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server (Vite):

```bash
npm run dev
```

The frontend will be accessible at:

```txt
http://localhost:5173
```

Or another port if specified in your terminal.

---

## 3. How to Create a Sample Quiz

Once both servers are up and running, follow these steps to create your first quiz:

1. Open your browser and go to:

```txt
http://localhost:5173
```

2. Click the **"+ Add Quiz"** button in the top-right corner.

3. Fill in the **Quiz Title** field.

Example:

```txt
JavaScript Basics
```

4. In the **Questions** section:

- Enter the question text.
- Select a question type from the dropdown:

### Available Question Types

#### True / False
Boolean selection.

#### Text Input
Short text answer format.

#### Multiple Choice

Requires options separated by commas:

```txt
Option A, Option B, Option C
```

5. Use the **"+ Add Question"** button to add as many questions as needed.

6. Click **"Save Quiz"** to submit.

After saving, you will be redirected to the dashboard where your newly created quiz card will appear.

---

## Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- SQLite
- Prisma ORM

### Frontend
- React + TypeScript
- Vite
- TanStack Query
- React Hook Form
- Axios