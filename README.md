# Task Manager Backend

Welcome to the **Task Manager Backend**! This backend service is designed to support the Task Manager application by providing APIs for task management, real-time updates through WebSockets, and email notifications for specific events.

## 🔧 Features

- **Task Management**: Create, update, delete, and retrieve tasks.
- **Real-time Updates**: Use WebSockets to receive real-time updates for task creation, updates, and deletions.
- **Email Notifications**: Send email notifications when tasks are created, updated, or deleted using Mailtrap for testing.

## 🚀 Getting Started

To get started with the Task Manager Backend, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone git@github.com:trat944/Chargevite-Backend.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd Chargevite-Backend
    ```

3. **Install dependencies:**
    ```bash
    pnpm install
    ```

4. **Copy the .env.example file to .env:**
    ```bash
    cp .env.example .env
    ```
    Or create the `.env` file manually and ensure it contains the following:
    ```
    DATABASE_URL=mongodb+srv://jrjrevuelta:7qq5Esq4Vf3nKtb0@tasks.qb3nbco.mongodb.net/?retryWrites=true&w=majority&appName=Tasks
    FRONTEND_URL=http://localhost:5173
    MAILTRAP_USER=
    MAILTRAP_PASS=
    ```

5. **Update the `.env` file with your Mailtrap credentials:**
    - Sign up or log in to [Mailtrap](https://mailtrap.io).
    - Find your Mailtrap user and password.
    - Update the `MAILTRAP_USER` and `MAILTRAP_PASS` fields in your `.env` file.

6. **Start the development server:**
    ```bash
    pnpm start
    ```

By default, the backend will run on `http://localhost:3000`. If you need to change this, you can modify the `main.ts` file.

## 💻 Technologies Used

### Backend:
- **[NestJS](https://nestjs.com/)**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **[TypeORM](https://typeorm.io/)**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- **[MongoDB](https://www.mongodb.com/)**: A NoSQL database for storing task data.
- **[WebSockets](https://www.npmjs.com/package/ws)**: For real-time communication.
- **[Nodemailer](https://nodemailer.com/about/)**: For sending emails.
- **[Mailtrap](https://mailtrap.io/)**: A tool for safe email testing.