const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const {
  addChild,
  assignChildToCaregiver,
  createCase,
  getMyChildren,
  getMyCases,
  getAvailableCaregivers,
  getMyReports,
  updateChild,
  updateCase
} = require('../controllers/socialWorkerController');

// Apply auth middleware to all routes
router.use(auth);
router.use(authorize('social-worker'));

// Children routes
router.post('/children', addChild);
router.get('/children', getMyChildren);
router.put('/children/:childId', updateChild);
router.put('/children/:childId/assign', assignChildToCaregiver);

// Cases routes
router.post('/cases', createCase);
router.get('/cases', getMyCases);
router.put('/cases/:caseId', updateCase);

// Caregivers routes
router.get('/caregivers', getAvailableCaregivers);

// Reports routes
router.get('/reports', getMyReports);

module.exports = router;
