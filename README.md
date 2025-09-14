Dev Innovations Labs — Mini CRM (MERN) Project
==================================================
Contents:
- backend: Express + MongoDB API
- frontend: Vite + React UI

Quick start (local)
-------------------
Prereqs:
- Node.js (v18+ recommended)
- npm
- MongoDB (local) or MongoDB Atlas

Backend:
1. cd backend
2. copy .env.example to .env and set MONGODB_URI and JWT_SECRET
   e.g. MONGODB_URI=mongodb://localhost:27017/mini-crm
3. npm install
4. npm run dev
   Server listens on PORT (default 5000)

Frontend:
1. cd frontend
2. npm install
3. npm run dev
   Frontend dev server runs on http://localhost:3000 (Vite)

Test:
- From backend: npm test (runs jest test included)

Notes:
- This project is a minimal, functional implementation to satisfy the assignment:
  - Register / Login (JWT)
  - Customers CRUD (pagination & search)
  - Leads CRUD nested under customers (filter by status)
  - Joi validation
  - Role-based middleware scaffold (can be extended)
  - One unit test for customers route
- You'll need to seed an admin user manually if you want admin role functionality.
- For production, set JWT_SECRET and use a hosted MongoDB Atlas URI.

File structure (top-level):
backend/
frontend/
README.md

Enjoy! If you want additional features (charts, Redux, better UI, Dockerfile), tell me what to add and I'll extend it.
