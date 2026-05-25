<h1 align="center">✨ Task Management System (TMS) ✨</h1>

<p align="center">
  A premium, full-stack Task Management portal built on the MERN stack with a visually stunning, mobile-first design.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-6366f1?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer"/>
</p>

## 🚀 Features

- **Secure Authentication**: Robust JWT login & registration architecture mapping unique task data to logged-in users.
- **Kanban Board**: Drag and drop feature functionality seamlessly mapping lists of `[To-Do]`, `[In Progress]`, and `[Completed]` lanes via `@dnd-kit/core`.
- **Real-Time Data Sync**: Tasks miraculously update seamlessly across multiple clients simultaneously via integrated WebSockets (`Socket.io`) directly on the backend!
- **Data Analytics**: A comprehensive analytics page leveraging `Recharts` providing holistic metrics on Task priorities and completions natively parsed into charts.
- **Stunning UI Details**: Premium implementation of Tailwind CSS and Framer Motion logic delivering micro-interactions, dark-mode styling, reverse-grid splits, and glassmorphic UI components.

---

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS v3
- Framer Motion (Animations)
- Zustand (Global State)
- @dnd-kit (Drag-and-Drop)

**Backend:**
- Node.js & Express
- MongoDB Atlas (Mongoose ORM)
- JSON Web Tokens (Authentication)
- Socket.io (WebSockets integration)

---

## 🏁 Quickstart Configuration

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/Task_Management_System.git
   ```

2. **Backend Instantiation**
   Set up your MongoDB URI string locally modifying `/backend/.env`.
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Implementation**
   Run the Vite development loop seamlessly:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Navigate to `localhost:5173` on any modern internet browser.

### 🌸 Aesthetic Recolor Configuration
The site defaults strictly to a gorgeous deeply integrated **Pink / Deep Purple gradient layout** corresponding organically with the Lottie-style framer interactions implemented throughout the UI!

<br />
<p align="center">Designed with 💖 by Sai Vighnesh</p>
