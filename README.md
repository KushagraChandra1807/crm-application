# ConnectFlow – Customer Relationship Management (CRM) Software

ConnectFlow is a full-stack Customer Relationship Management (CRM) web application that helps businesses manage their customers and leads in an organized and efficient way.  
It provides user authentication, customer management, lead tracking, and categorization to streamline business workflows.

---

## 🚀 Features

- **User Authentication**
  - Create an account and securely log in.
  
- **Customer Management**
  - Add and manage customers with essential details.
  - Search customers by **name** or **email ID**.

- **Lead Management**
  - Add leads for each customer.
  - Categorize leads into different stages:
    - 🆕 New  
    - 📞 Contacted  
    - ✅ Converted  
    - ❌ Lost  

- **Search & Filter**
  - Powerful search bar to quickly find customers.

---

## 🛠️ Tech Stack

### Frontend
- **React 18**
- **Vite**
- **React Router DOM**
- **Axios**
- **Framer Motion** (animations)
- **Heroicons / Lucide Icons / React Icons**
- **Tailwind CSS**

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Bcrypt.js** (password hashing)
- **Joi** (validation)
- **CORS & Dotenv**

### Development Tools
- **Nodemon**
- **Jest & Supertest** (for testing)

---

## 📂 Project Structure

```
connectflow/
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/          # Page components (Login, Register, Dashboard, etc.)
│   │   ├── components/     # Reusable UI components
│   │   ├── styles/         # CSS & Tailwind setup
│   │   └── api/            # Axios configuration
│   └── package.json
│
├── backend/                # Express backend
│   ├── models/             # Mongoose schemas (User, Customer, Lead)
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Entry point
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/connectflow.git
cd connectflow
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` (Vite default).  
The backend will run at `http://localhost:5000`.

---

## 🌍 Deployment

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and import the `frontend` folder.
2. Set the **build command**:  
   ```
   npm run build
   ```
   and the **output directory**:  
   ```
   dist
   ```
3. Deploy 🎉

### Backend (Render)
1. Go to [Render](https://render.com/) and create a new Web Service.
2. Connect your GitHub repo and select the `backend` folder.
3. Set **Build Command**:  
   ```
   npm install
   ```
   and **Start Command**:  
   ```
   npm start
   ```
4. Add environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`) in Render dashboard.
5. Deploy 🎉

---

## 🧪 Testing
Run backend tests:
```bash
cd backend
npm test
```

---

## 📸 Screenshots
<img width="1901" height="892" alt="landingpage" src="https://github.com/user-attachments/assets/32cde28f-e0a3-4bff-a1af-7cdc96840867" />
<img width="1907" height="901" alt="signup" src="https://github.com/user-attachments/assets/5d8ff89c-0018-4751-9c92-663cb3800a62" />
<img width="1888" height="902" alt="signin" src="https://github.com/user-attachments/assets/958b2560-d67a-4e3e-8e7b-41d8ab75a017" />
<img width="1916" height="892" alt="customers" src="https://github.com/user-attachments/assets/16ab6fb1-2067-46a3-b8f3-493008ae66fb" />
<img width="565" height="717" alt="customerdetail leads" src="https://github.com/user-attachments/assets/613f3215-3e50-452a-b606-2614c7f0e95a" />

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to fork this repo and submit a pull request.

---

## 📜 License
This project is licensed under the **MIT License**.

---

### 👨‍💻 Author
Developed by **Kushagra Chandra** 🚀  
