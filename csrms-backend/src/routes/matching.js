const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const MatchingService = require('../services/matchingService');

const router = express.Router();

// @route   GET /api/matching/resources-to-needs
// @desc    Get automated resource-to-need matches
// @access  Private (Admin, Social Worker)
router.get('/resources-to-needs', [auth, authorize('admin', 'social-worker')], async (req, res) => {
  try {
    const matches = await MatchingService.matchResourcesToNeeds();

    res.json({
      success: true,
      data: matches,
      totalMatches: matches.length,
      totalChildren: matches.length
    });

  } catch (error) {
    console.error('Resource matching error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during resource matching'
    });
  }
});

// @route   POST /api/matching/auto-allocate
// @desc    Auto-allocate resources based on priority
// @access  Private (Admin)
router.post('/auto-allocate', [auth, authorize('admin')], async (req, res) => {
  try {
    const { availableFunds = 10000 } = req.body;

    const allocation = await MatchingService.autoAllocateResources(availableFunds);

    res.json({
      success: true,
      message: 'Resources allocated successfully',
      data: allocation
    });

  } catch (error) {
    console.error('Auto allocation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during resource allocation'
    });
  }
});

// @route   GET /api/matching/priority-list
// @desc    Get prioritized list of children needing resources
// @access  Private (Admin, Social Worker)
router.get('/priority-list', [auth, authorize('admin', 'social-worker')], async (req, res) => {
  try {
    const matches = await MatchingService.matchResourcesToNeeds();
    
    // Flatten and sort by priority
    const priorityList = [];
    matches.forEach(match => {
      match.matches.forEach(m => {
        priorityList.push({
          childId: match.childId,
          childName: match.childName,
          resourceType: m.type,
          priority: m.priority,
          urgency: m.urgency,
          estimatedCost: m.estimatedCost,
          description: m.description
        });
      });
    });

    priorityList.sort((a, b) => b.priority - a.priority);

    res.json({
      success: true,
      data: priorityList,
      totalItems: priorityList.length
    });

  } catch (error) {
    console.error('Priority list error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error generating priority list'
    });
  }
});

module.exports = router;