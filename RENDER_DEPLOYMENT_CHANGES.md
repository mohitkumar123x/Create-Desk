# Render Deployment Changes

This document summarizes the changes made to prepare this project for deployment on Render using Docker.

## What Was Added/Updated

### 1) Render Blueprint Configuration
- **File:** `render.yaml`
- **Purpose:** Define Render infrastructure as code for two Docker web services:
  - `createdesk-backend` from `backend/Dockerfile`
  - `createdesk-frontend` from `frontend/Dockerfile`
- **Includes:**
  - Service definitions
  - Docker root directories and Dockerfile paths
  - Backend health check path (`/`)
  - Required environment variable placeholders (`sync: false`)

### 2) Frontend Docker Runtime Port for Render
- **File:** `frontend/Dockerfile`
- **Changes:**
  - Added custom nginx config copy:
    - `COPY nginx.conf /etc/nginx/conf.d/default.conf`
  - Changed exposed port:
    - from `EXPOSE 80`
    - to `EXPOSE 10000`
- **Why:** Render expects the web service to bind to its internal service port; this setup ensures predictable frontend routing and serving behavior.

### 3) Frontend Nginx Configuration for SPA Routing
- **File:** `frontend/nginx.conf` (new)
- **Changes:**
  - `listen 10000;`
  - `root /usr/share/nginx/html;`
  - `try_files $uri /index.html;`
- **Why:** React/Vite frontend is an SPA. `try_files` fallback ensures direct navigation to nested routes works in production.

### 4) Backend CORS Hardening for Deployed Frontend
- **File:** `backend/server.js`
- **Changes:**
  - Added `FRONTEND_URL` based allowlist parsing (comma-separated supported)
  - Replaced open `cors()` with explicit origin callback checks
  - Kept localhost/server-to-server compatibility (`!origin` and localhost allowance)
- **Why:** In production, backend should only accept browser requests from trusted frontend origins.

### 5) Deployment Instructions in Project README
- **File:** `README.md`
- **Changes:**
  - Added section: `Deploy on Render (Docker)`
  - Added step-by-step Blueprint deploy instructions
  - Added required environment variable list for frontend and backend
  - Added guidance for setting:
    - `FRONTEND_URL` = frontend Render URL
    - `VITE_BASE_URL` = backend Render URL

## Environment Variables Needed on Render

### Backend (`createdesk-backend`)
- `NODE_ENV=production`
- `FRONTEND_URL`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `OPENAI_API_KEY`
- `DATABASE_URL`

### Frontend (`createdesk-frontend`)
- `VITE_BASE_URL`
- `VITE_CLERK_PUBLISHABLE_KEY`

## Deployment Outcome

After these changes, the project is set up to be deployed on Render as two Docker-based web services using a single `render.yaml` Blueprint flow.
