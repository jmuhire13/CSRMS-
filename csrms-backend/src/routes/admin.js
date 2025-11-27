const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const childController = require('../controllers/childController');
const donationController = require('../controllers/donationController');

// All routes require admin role
router.use(auth);
router.use(authorize('admin'));

// User Management Routes
router.post('/users/social-worker', adminController.createSocialWorker);
router.post('/users/caregiver', adminController.createCaregiver);
router.get('/users/social-workers', adminController.getAllSocialWorkers);
router.get('/users/caregivers', adminController.getAllCaregivers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.post('/users/:id/reset-password', adminController.resetUserPassword);

// Children Management Routes
router.get('/children', childController.getAllChildren);
router.get('/children/by-district', childController.getChildrenByDistrict);

// Donation Management Routes
router.get('/donations', donationController.getAllDonations);
router.get('/donations/by-category', donationController.getDonationsByCategory);
router.get('/donations/trends', donationController.getDonationTrends);

module.exports = router;
