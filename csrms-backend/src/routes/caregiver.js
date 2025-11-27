const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const {
  getMyChildren,
  getChildDetails,
  createAssessment,
  getMyAssessments,
  createResourceRequest,
  getMyResourceRequests,
  sendMessage,
  getMessages,
  markMessageAsRead,
  getDashboardStats
} = require('../controllers/caregiverController');

// Apply auth middleware to all routes
router.use(auth);
router.use(authorize('caregiver'));

// Dashboard
router.get('/dashboard', getDashboardStats);

// Children routes
router.get('/children', getMyChildren);
router.get('/children/:childId', getChildDetails);

// Assessment routes
router.post('/assessments', createAssessment);
router.get('/assessments', getMyAssessments);

// Resource request routes
router.post('/resource-requests', createResourceRequest);
router.get('/resource-requests', getMyResourceRequests);

// Message routes
router.post('/messages', sendMessage);
router.get('/messages', getMessages);
router.put('/messages/:messageId/read', markMessageAsRead);

module.exports = router;
