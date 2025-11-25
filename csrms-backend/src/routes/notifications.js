const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const NotificationService = require('../services/notificationService');

const router = express.Router();

// @route   GET /api/notifications/alerts
// @desc    Get all system alerts
// @access  Private
router.get('/alerts', auth, async (req, res) => {
  try {
    const alertSummary = await NotificationService.generateAlertSummary();

    res.json({
      success: true,
      data: alertSummary
    });

  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving alerts'
    });
  }
});

// @route   GET /api/notifications/urgent-cases
// @desc    Get urgent cases requiring immediate attention
// @access  Private (Admin, Social Worker)
router.get('/urgent-cases', [auth, authorize('admin', 'social-worker')], async (req, res) => {
  try {
    const urgentCases = await NotificationService.checkUrgentCases();

    res.json({
      success: true,
      data: urgentCases,
      count: urgentCases.length
    });

  } catch (error) {
    console.error('Urgent cases error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking urgent cases'
    });
  }
});

// @route   GET /api/notifications/dropout-risks
// @desc    Get children at risk of school dropout
// @access  Private (Admin, Social Worker)
router.get('/dropout-risks', [auth, authorize('admin', 'social-worker')], async (req, res) => {
  try {
    const dropoutRisks = await NotificationService.checkSchoolDropoutRisk();

    res.json({
      success: true,
      data: dropoutRisks,
      count: dropoutRisks.length
    });

  } catch (error) {
    console.error('Dropout risks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking dropout risks'
    });
  }
});

// @route   GET /api/notifications/malnutrition-risks
// @desc    Get children at risk of malnutrition
// @access  Private (Admin, Social Worker)
router.get('/malnutrition-risks', [auth, authorize('admin', 'social-worker')], async (req, res) => {
  try {
    const malnutritionRisks = await NotificationService.checkMalnutritionRisk();

    res.json({
      success: true,
      data: malnutritionRisks,
      count: malnutritionRisks.length
    });

  } catch (error) {
    console.error('Malnutrition risks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking malnutrition risks'
    });
  }
});

// @route   POST /api/notifications/send-alerts
// @desc    Send notifications for all high-priority alerts
// @access  Private (Admin)
router.post('/send-alerts', [auth, authorize('admin')], async (req, res) => {
  try {
    const result = await NotificationService.sendAllNotifications();

    res.json({
      success: true,
      message: 'Notifications sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Send alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error sending notifications'
    });
  }
});

module.exports = router;