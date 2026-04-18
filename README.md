# CreateDesk - Full Stack AI Platform

CreateDesk is a modern, professional full-stack platform that leverages AI to provide tools for content creation, image generation, resume reviewing, and more. It is built with a scalable architecture and is fully containerized for seamless development and production deployment.

---

## 📸 App Preview

![Landing Page](Demo_vedio/Screenshot%202026-04-10%20210810.png)
![Dashboard](Demo_vedio/Screenshot%202026-04-10%20210853.png)
![Tool Interface](Demo_vedio/Screenshot%202026-04-10%20210919.png)
![Image Gen](Demo_vedio/Screenshot%202026-04-10%20211016.png)

## 🎥 Demo Video

<video src="Demo_vedio/DEMO.webm" controls width="100%"></video>

[Download Demo Video](Demo_vedio/DEMO.webm)

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS (v4)
- **Authentication:** Clerk React
- **Icons:** Lucide React
- **State/Routing:** React Router 7
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js (Express 5)
- **Database:** Neon (Serverless PostgreSQL)
- **AI Integration:** OpenAI API
- **Storage:** Cloudinary (for media management)
- **Authentication:** Clerk Express SDK
- **File Handling:** Multer & PDF-Parse

### DevOps & Infrastructure
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (for production frontend serving)
- **Development:** Hot-Reloading via Docker Volumes and Vite Polling

---

## 🏗️ Architecture & Features

### Feature-Based Structure
The frontend is organized into a scalable **Feature-Based Architecture**. Instead of generic `components` folders, logic is grouped by domain (e.g., `features/home`, `features/ai-tools`), making the codebase easier to maintain as it grows.

### Path Aliasing
To avoid "relative path hell" (`../../../../`), the project uses **Path Aliasing**.
- `@/` maps directly to the `src/` directory.
- Example: `import Navbar from '@/components/layout/Navbar'`

### Containerized Workflow
- **Development:** Uses `Dockerfile.dev` with volume mapping for real-time hot-reloading.
- **Production:** Uses multi-stage builds and Nginx to serve optimized static assets.

---

## 📂 Project Structure

```text
.
├── backend/                # Express server logic
│   ├── configs/            # DB, Cloudinary, Multer configurations
│   ├── controllers/        # Business logic for routes
│   ├── middlewares/        # Auth and custom middlewares
│   ├── routes/             # API endpoints
│   └── server.js           # Entry point
├── frontend/               # React client application
│   ├── src/
│   │   ├── assets/         # Static images and icons
│   │   ├── components/     # Global/Shared UI components (Layout, Navbar)
│   │   ├── features/       # Feature-specific logic and components
│   │   ├── pages/          # Main application views/routes
│   │   └── App.jsx         # Routing configuration
│   ├── vite.config.js      # Vite & Alias configuration
│   └── jsconfig.json       # IDE Intellisense for aliases
└── docker-compose.yml      # Orchestration for both services
```

---

## 🚦 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed.
- (Optional) Node.js 20+ if running without Docker.

### Environment Setup
1. Create a `.env` file in the `backend/` directory:
   ```env
   CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   OPENAI_API_KEY=your_openai_key
   DATABASE_URL=your_neon_db_url
   ```
2. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
   ```

### Running with Docker (Recommended)

**Development Mode (with Hot-Reloading):**
```bash
docker-compose up --build
```
The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

**Production Mode:**
The `docker-compose.yml` is currently set up for a development-ready environment. For production deployment, you would typically use the `Dockerfile` (non-dev) in each directory.

---

## 🛠️ Key Commands

| Command | Description |
| :--- | :--- |
| `docker-compose up` | Start the entire stack |
| `docker-compose down` | Stop and remove containers |
| `npm run dev` | (Frontend) Run locally without Docker |
| `npm start` | (Backend) Run locally without Docker |

---

## ☁️ Deploy on Render (Docker)

This repo includes a Render Blueprint file: `render.yaml`.

1. Push this repository to GitHub.
2. In Render, create a **Blueprint** and select this repository.
3. Render will create two web services:
   - `createdesk-backend` (from `backend/Dockerfile`)
   - `createdesk-frontend` (from `frontend/Dockerfile`)
4. Set environment variables in Render:
   - Backend: `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLOUDINARY_*`, `OPENAI_API_KEY`, `DATABASE_URL`, `FRONTEND_URL`
   - Frontend: `VITE_BASE_URL`, `VITE_CLERK_PUBLISHABLE_KEY`
5. Set:
   - `FRONTEND_URL` to your deployed frontend URL
   - `VITE_BASE_URL` to your deployed backend URL (for example `https://createdesk-backend.onrender.com`)
6. Redeploy both services after setting variables.

---

## 📝 License
This project is licensed under the ISC License.
