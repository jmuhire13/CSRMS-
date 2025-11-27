# Compassionate Rwanda Management System (CSRMS)

A comprehensive digital platform connecting NGOs, schools, and caregivers to track and deliver resources to vulnerable children across Rwanda.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

CSRMS is a full-stack MERN application that provides:
- **Multi-role portal system** (Admin, Social Worker, Caregiver, Donor)
- **Child welfare tracking** with comprehensive profiles
- **Resource request management** for children in need
- **Donation processing** with Stripe integration
- **Case management** for social workers
- **Real-time alerts and notifications**
- **Responsive design** for mobile and desktop

## 🛠 Tech Stack

### Frontend
- **React 19.2** - UI framework
- **React Router v7** - Client-side routing
- **Vite 7.2** - Build tool and dev server
- **TailwindCSS 4** - Styling framework
- **Motion (Framer Motion)** - Animations
- **Lucide React & React Icons** - Icon libraries

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose 8.0** - ODM for MongoDB
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Helmet & CORS** - Security middleware

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Atlas account** (free tier) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Stripe account** (optional, for donations) - [Sign up here](https://stripe.com/)

To verify installations:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
git --version   # Should show 2.x.x or higher
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jmuhire13/CSRMS-.git
cd CSRMS-
```

### 2. Install Backend Dependencies

```bash
cd csrms-backend
npm install
```

This will install:
- express, mongoose, jsonwebtoken, bcryptjs
- dotenv, cors, helmet, express-rate-limit
- stripe, multer, express-validator
- nodemon (dev dependency)

### 3. Install Frontend Dependencies

```bash
cd ../csrms-frontend
npm install
```

This will install:
- react, react-dom, react-router-dom
- vite, tailwindcss, motion
- lucide-react, react-icons
- ESLint and other dev tools

## ⚙️ Environment Setup

### Backend Environment Variables

1. Create a `.env` file in the `csrms-backend` directory:

```bash
cd csrms-backend
touch .env  # On Windows: type nul > .env
```

2. Add the following environment variables to `csrms-backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters
JWT_EXPIRE=7d

# Stripe Configuration (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

#### How to Get MongoDB URI:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you haven't already)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., `csrms`)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/csrms?retryWrites=true&w=majority
```

#### Generate JWT Secret:

You can generate a secure random string using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Get Stripe Keys (Optional):

1. Sign up at [Stripe](https://stripe.com/)
2. Go to Developers → API keys
3. Copy your test keys (they start with `sk_test_` and `pk_test_`)

### Frontend Environment Variables

1. Create a `.env` file in the `csrms-frontend` directory:

```bash
cd ../csrms-frontend
touch .env  # On Windows: type nul > .env
```

2. Add the following to `csrms-frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Stripe Publishable Key (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

**Note:** Vite requires all environment variables to be prefixed with `VITE_`

## 🏃 Running the Application

### Development Mode

#### 1. Start the Backend Server

Open a terminal in the `csrms-backend` directory:

```bash
cd csrms-backend
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:5000
📦 MongoDB Connected Successfully
```

The backend will run on **http://localhost:5000**

#### 2. Start the Frontend Development Server

Open a **new terminal** in the `csrms-frontend` directory:

```bash
cd csrms-frontend
npm run dev
```

You should see:
```
  VITE v7.2.2  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

The frontend will run on **http://localhost:5173**

#### 3. Access the Application

Open your browser and navigate to:
- **Website:** http://localhost:5173
- **Portal Login:** http://localhost:5173/portal

### Production Build

#### Backend

```bash
cd csrms-backend
npm start
```

#### Frontend

```bash
cd csrms-frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
CSRMS-/
├── csrms-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── caregiverController.js
│   │   │   ├── childController.js
│   │   │   ├── donationController.js
│   │   │   └── socialWorkerController.js
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT authentication
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Child.js
│   │   │   ├── Case.js
│   │   │   ├── Donation.js
│   │   │   ├── ResourceRequest.js
│   │   │   ├── Assessment.js
│   │   │   └── Message.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── admin.js
│   │   │   ├── caregiver.js
│   │   │   ├── socialWorker.js
│   │   │   ├── children.js
│   │   │   ├── donations.js
│   │   │   ├── cases.js
│   │   │   └── users.js
│   │   ├── services/
│   │   │   ├── matchingService.js
│   │   │   └── notificationService.js
│   │   ├── utils/
│   │   │   └── seedUsers.js        # Seed default users
│   │   └── server.js               # Entry point
│   ├── .env
│   ├── package.json
│   └── vercel.json                 # Vercel config
│
├── csrms-frontend/
│   ├── public/
│   │   ├── logo.svg
│   │   └── _redirects             # Netlify/Vercel redirects
│   ├── src/
│   │   ├── assets/                # Images and static files
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PortalLayout.jsx
│   │   │   ├── PortalHeader.jsx
│   │   │   ├── PortalSidebar.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── UserContext.jsx    # Auth context
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── admin/
│   │   │   ├── social-worker/
│   │   │   ├── caregiver/
│   │   │   └── donor/
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── Portal.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json                # Vercel config
│
└── README.md                       # This file
```

## 🔐 Default User Accounts

After setting up, you can seed the database with default users:

```bash
cd csrms-backend
node src/utils/seedUsers.js
```

This creates the following test accounts:

| Role          | Email                    | Password    |
|---------------|--------------------------|-------------|
| Admin         | admin@csrms.rw          | Admin@123   |
| Social Worker | socialworker@csrms.rw   | Worker@123  |
| Caregiver     | caregiver@csrms.rw      | Caregiver@123 |
| Donor         | donor@csrms.rw          | Donor@123   |

**⚠️ Important:** Change these passwords in production!

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "donor"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

### Protected Routes

All authenticated routes require the JWT token in the Authorization header:
```http
Authorization: Bearer <your-jwt-token>
```

### Key Endpoints by Role

#### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/children` - Get all children
- `GET /api/admin/donations` - Get all donations
- `PUT /api/admin/users/:id/approve` - Approve user

#### Social Worker
- `GET /api/social-worker/children` - Get assigned children
- `POST /api/social-worker/children` - Add new child
- `GET /api/social-worker/cases` - Get cases
- `POST /api/social-worker/cases` - Create case

#### Caregiver
- `GET /api/caregiver/children` - Get my children
- `POST /api/caregiver/assessments` - Submit assessment
- `GET /api/caregiver/resource-requests` - Get requests

#### Donor
- `POST /api/donations/create` - Create donation
- `GET /api/donations/my-donations` - Get my donations
- `GET /api/donations/children` - Get children in need

## 🚀 Deployment

### Deploy Backend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd csrms-backend
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all variables from your `.env` file
   - Update `CLIENT_URL` to your frontend URL

### Deploy Frontend to Vercel

1. Deploy:
```bash
cd csrms-frontend
vercel
```

2. Update environment variables:
   - Set `VITE_API_URL` to your backend URL

### Environment Variables on Vercel

Make sure to add all environment variables in the Vercel dashboard under:
**Project Settings → Environment Variables**

## 🔧 Troubleshooting

### Backend Issues

#### MongoDB Connection Error
```
Error: queryTxt ENOTFOUND _mongodb._tcp.cluster0.xxxxx.mongodb.net
```
**Solution:**
- Check your MongoDB URI in `.env`
- Verify your database user credentials
- Ensure your IP address is whitelisted in MongoDB Atlas

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

Or change the PORT in `.env` to another value (e.g., 5001)

### Frontend Issues

#### Cannot Connect to Backend
```
Network Error / Failed to fetch
```
**Solution:**
- Ensure backend is running on http://localhost:5000
- Check `VITE_API_URL` in `csrms-frontend/.env`
- Verify CORS is enabled in backend

#### Build Errors
```
Error: Cannot find module
```
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Common Issues

#### JWT Token Expired
**Solution:** Log out and log in again

#### Stripe Test Mode
**Solution:** Use test credit card: `4242 4242 4242 4242` with any future expiry date

#### Cold Start on Vercel
**Solution:** 
- Use UptimeRobot to ping your backend every 5 minutes
- Ping URL: `https://your-backend.vercel.app/api/health`

## 📝 Additional Notes

### Development Tips

1. **Hot Reload:** Both frontend and backend support hot reload in development
2. **Database Seeding:** Run `node src/utils/seedUsers.js` to populate test data
3. **API Testing:** Use Postman or Thunder Client for API testing
4. **Console Logs:** Check browser console and terminal for errors

### Security Reminders

- ✅ Never commit `.env` files to Git
- ✅ Use strong JWT secrets (minimum 32 characters)
- ✅ Change default user passwords in production
- ✅ Enable MongoDB Atlas IP whitelisting
- ✅ Use HTTPS in production

### Performance Tips

- Backend is optimized with rate limiting (100 requests/15 min)
- Frontend uses code splitting and lazy loading
- Images should be optimized before upload
- Consider using a CDN for static assets in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

CSRMS Team - Building a Compassionate Rwanda, One Child at a Time

## 📞 Support

For support, email: info@compassionaterwanda.org

---

**Last Updated:** November 27, 2025
