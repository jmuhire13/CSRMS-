const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const Child = require('../models/Child');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/reports/dashboard
// @desc    Get dashboard statistics
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    let filter = {};
    
    // Role-based filtering
    if (req.user.role === 'social-worker') {
      filter.assignedSocialWorker = req.user.id;
    }

    const totalChildren = await Child.countDocuments(filter);
    const activeChildren = await Child.countDocuments({ ...filter, status: 'active' });
    const urgentCases = await Child.countDocuments({
      ...filter,
      $or: [
        { 'needs.healthcare.priority': 'urgent' },
        { 'needs.education.priority': 'urgent' },
        { 'needs.nutrition.priority': 'urgent' },
        { 'needs.housing.priority': 'urgent' }
      ]
    });

    // Progress statistics
    const progressStats = await Child.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgHealth: { $avg: '$progress.health' },
          avgEducation: { $avg: '$progress.education' },
          avgNutrition: { $avg: '$progress.nutrition' },
          avgHousing: { $avg: '$progress.housing' },
          avgOverall: { $avg: '$progress.overall' }
        }
      }
    ]);

    // District distribution
    const districtStats = await Child.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$location.district',
          count: { $sum: 1 },
          avgProgress: { $avg: '$progress.overall' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Age distribution
    const ageStats = await Child.aggregate([
      { $match: filter },
      {
        $addFields: {
          age: {
            $floor: {
              $divide: [
                { $subtract: [new Date(), '$personalInfo.dateOfBirth'] },
                365.25 * 24 * 60 * 60 * 1000
              ]
            }
          }
        }
      },
      {
        $bucket: {
          groupBy: '$age',
          boundaries: [0, 5, 10, 15, 18],
          default: '18+',
          output: {
            count: { $sum: 1 },
            avgProgress: { $avg: '$progress.overall' }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalChildren,
          activeChildren,
          urgentCases,
          completionRate: progressStats[0]?.avgOverall || 0
        },
        progress: progressStats[0] || {
          avgHealth: 0,
          avgEducation: 0,
          avgNutrition: 0,
          avgHousing: 0,
          avgOverall: 0
        },
        districts: districtStats,
        ageGroups: ageStats
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/reports/system
// @desc    Get system-wide statistics (Admin only)
// @access  Private (Admin)
router.get('/system', [auth, authorize('admin')], async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ['$isActive', true] }, 1, 0]
            }
          }
        }
      }
    ]);

    const totalChildren = await Child.countDocuments();
    const childrenByStatus = await Child.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const systemHealth = {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV
    };

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          byRole: usersByRole
        },
        children: {
          total: totalChildren,
          byStatus: childrenByStatus
        },
        system: systemHealth
      }
    });

  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/reports/performance
// @desc    Get performance metrics
// @access  Private (Admin, Social Worker)
router.get('/performance', [auth, authorize('admin', 'social-worker')], async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30'; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeframe));

    let filter = { createdAt: { $gte: startDate } };
    
    if (req.user.role === 'social-worker') {
      filter.assignedSocialWorker = req.user.id;
    }

    // New registrations
    const newRegistrations = await Child.countDocuments(filter);

    // Progress improvements
    const progressImprovements = await Child.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgImprovement: {
            $avg: {
              $subtract: ['$progress.overall', 0] // Simplified - would need historical data
            }
          }
        }
      }
    ]);

    // Case completion rate
    const completedCases = await Child.countDocuments({
      ...filter,
      status: { $in: ['graduated', 'completed'] }
    });

    const totalCases = await Child.countDocuments(filter);
    const completionRate = totalCases > 0 ? (completedCases / totalCases) * 100 : 0;

    res.json({
      success: true,
      data: {
        timeframe: `${timeframe} days`,
        newRegistrations,
        completionRate: Math.round(completionRate * 100) / 100,
        avgProgressImprovement: progressImprovements[0]?.avgImprovement || 0,
        totalActiveCases: totalCases
      }
    });

  } catch (error) {
    console.error('Get performance metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;