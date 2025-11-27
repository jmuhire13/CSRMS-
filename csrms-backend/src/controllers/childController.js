const Child = require('../models/Child');
const mongoose = require('mongoose');

// @desc    Get all children with statistics (Admin only)
exports.getAllChildren = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    
    if (req.query.district) filter['location.district'] = req.query.district;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.socialWorker) filter.assignedSocialWorker = req.query.socialWorker;
    if (req.query.search) {
      filter.$or = [
        { 'personalInfo.firstName': { $regex: req.query.search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: req.query.search, $options: 'i' } },
        { childId: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const children = await Child.find(filter)
      .populate('assignedSocialWorker', 'name email phone district')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Child.countDocuments(filter);

    // Get statistics
    const stats = await Child.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const avgProgress = await Child.aggregate([
      {
        $group: {
          _id: null,
          avgOverall: { $avg: '$progress.overall' }
        }
      }
    ]);

    res.json({
      success: true,
      data: children,
      statistics: {
        total,
        byStatus: stats,
        averageProgress: avgProgress[0]?.avgOverall || 0
      },
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get all children error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get children statistics by district
exports.getChildrenByDistrict = async (req, res) => {
  try {
    const districtStats = await Child.aggregate([
      {
        $group: {
          _id: '$location.district',
          count: { $sum: 1 },
          activeCount: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          avgProgress: { $avg: '$progress.overall' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: districtStats
    });

  } catch (error) {
    console.error('Get children by district error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
