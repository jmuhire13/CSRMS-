# CSRMS Backend API

Complete backend API server for the Compassionate Rwanda Management System (CSRMS).

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Admin, Social Worker, Caregiver, and Donor roles
- **Child Management**: Complete child registry with progress tracking
- **Case Management**: Case creation, activity tracking, and progress monitoring
- **Donation Management**: Donation processing with impact tracking
- **Reports & Analytics**: Dashboard statistics and performance metrics
- **Security**: Helmet, CORS, rate limiting, and input validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   - Copy `.env` file and update with your values
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `JWT_SECRET` to a secure random string
   - Update `FRONTEND_URL` to match your frontend URL

3. **Start the server**:
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

4. **Verify installation**:
   - Visit `http://localhost:5000/api/health`
   - Should return server status and uptime

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/social-workers` - Get social workers
- `PUT /api/users/:id/status` - Update user status (Admin only)

### Children
- `GET /api/children` - Get children (with filters)
- `GET /api/children/:id` - Get single child
- `POST /api/children` - Create child record
- `PUT /api/children/:id` - Update child record
- `POST /api/children/:id/notes` - Add note to child

### Cases
- `GET /api/cases` - Get cases
- `POST /api/cases` - Create new case
- `POST /api/cases/:id/activities` - Add activity to case

### Donations
- `GET /api/donations` - Get donations
- `POST /api/donations` - Create donation
- `GET /api/donations/stats` - Get donation statistics

### Reports
- `GET /api/reports/dashboard` - Dashboard statistics
- `GET /api/reports/system` - System statistics (Admin only)
- `GET /api/reports/performance` - Performance metrics

## Database Models

### User
- Personal information and authentication
- Role-based permissions (admin, social-worker, caregiver, donor)
- Profile and preferences

### Child
- Personal information and guardian details
- Location and assigned social worker
- Needs assessment and progress tracking
- Documents and notes

### Case
- Case management with goals and activities
- Resource tracking and progress monitoring
- Visit scheduling and outcomes

### Donation
- Donation processing and tracking
- Impact metrics and receipt generation
- Recurring donation support

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for each user role
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin request security
- **Helmet Security**: Security headers and protection
- **Password Hashing**: Bcrypt password encryption

## Development

### Project Structure
```
src/
├── config/          # Database and app configuration
├── controllers/     # Request handlers (future expansion)
├── middleware/      # Custom middleware (auth, validation)
├── models/          # Database models
├── routes/          # API route definitions
├── utils/           # Utility functions
└── server.js        # Main application entry point
```

### Adding New Features

1. **Create Model**: Define schema in `models/`
2. **Add Routes**: Create route handlers in `routes/`
3. **Add Middleware**: Create custom middleware if needed
4. **Update Server**: Import and use new routes in `server.js`

### Testing

```bash
# Run tests (when implemented)
npm test

# Check API health
curl http://localhost:5000/api/health
```

## Deployment

### Environment Variables
Ensure all production environment variables are set:
- `NODE_ENV=production`
- `MONGODB_URI` (production database)
- `JWT_SECRET` (secure random string)
- `FRONTEND_URL` (production frontend URL)

### Production Setup
1. Install dependencies: `npm install --production`
2. Set environment variables
3. Start server: `npm start`
4. Use process manager like PM2 for production

## API Integration

### Frontend Integration
The backend is designed to work with the CSRMS React frontend. Key integration points:

1. **Authentication**: JWT tokens for secure API access
2. **Role-based Data**: API responses filtered by user role
3. **Real-time Updates**: WebSocket support (future enhancement)
4. **File Uploads**: Support for document and image uploads

### Sample API Calls

```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// Get children (with auth token)
const children = await fetch('/api/children', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Create donation
const donation = await fetch('/api/donations', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ amount, paymentMethod, category })
});
```

## Support

For issues and questions:
1. Check the API health endpoint
2. Review server logs for errors
3. Verify environment configuration
4. Check MongoDB connection

## License

MIT License - see LICENSE file for details.