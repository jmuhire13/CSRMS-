const Donation = require('../models/Donation');

// @desc    Get all donations with statistics (Admin only)
exports.getAllDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.dateFrom) {
      filter.createdAt = { $gte: new Date(req.query.dateFrom) };
    }
    if (req.query.dateTo) {
      filter.createdAt = { ...filter.createdAt, $lte: new Date(req.query.dateTo) };
    }

    const donations = await Donation.find(filter)
      .populate('donor', 'name email')
      .populate('dedicatedTo', 'personalInfo childId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments(filter);

    // Get statistics
    const stats = await Donation.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          completedAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$amount', 0] }
          },
          pendingAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, '$amount', 0] }
          },
          donorCount: { $addToSet: '$donor' }
        }
      }
    ]);

    res.json({
      success: true,
      data: donations,
      statistics: {
        total: stats[0]?.totalAmount || 0,
        completed: stats[0]?.completedAmount || 0,
        pending: stats[0]?.pendingAmount || 0,
        uniqueDonors: stats[0]?.donorCount?.length || 0,
        totalRecords: total
      },
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get all donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get donation statistics by category
exports.getDonationsByCategory = async (req, res) => {
  try {
    const categoryStats = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { totalAmount: -1 }
      }
    ]);

    res.json({
      success: true,
      data: categoryStats
    });

  } catch (error) {
    console.error('Get donations by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get donation trends (monthly)
exports.getDonationTrends = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const trends = await Donation.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      success: true,
      data: trends
    });

  } catch (error) {
    console.error('Get donation trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get donor dashboard stats
exports.getDonorDashboard = async (req, res) => {
  try {
    const donorId = req.user.id;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // Get all donor's donations
    const donations = await Donation.find({ 
      donor: donorId,
      status: 'completed'
    }).populate('dedicatedTo', 'personalInfo');

    // Calculate stats
    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
    
    const thisYearDonations = donations.filter(d => 
      d.createdAt.getFullYear() === currentYear
    );
    const thisYearTotal = thisYearDonations.reduce((sum, d) => sum + d.amount, 0);
    
    const thisMonthDonations = donations.filter(d => 
      d.createdAt.getFullYear() === currentYear && 
      d.createdAt.getMonth() === currentMonth
    );
    const thisMonthTotal = thisMonthDonations.reduce((sum, d) => sum + d.amount, 0);

    // Get unique children supported
    const childrenSet = new Set();
    donations.forEach(d => {
      if (d.dedicatedTo && d.dedicatedTo.length > 0) {
        d.dedicatedTo.forEach(child => childrenSet.add(child._id.toString()));
      }
    });

    // Monthly trend for current year
    const monthlyTrend = Array.from({ length: 12 }, (_, i) => {
      const monthDonations = donations.filter(d => 
        d.createdAt.getFullYear() === currentYear && 
        d.createdAt.getMonth() === i
      );
      return {
        month: new Date(currentYear, i, 1).toLocaleDateString('en-US', { month: 'short' }),
        amount: monthDonations.reduce((sum, d) => sum + d.amount, 0),
        count: monthDonations.length
      };
    });

    // Category breakdown
    const categoryBreakdown = {};
    donations.forEach(d => {
      if (!categoryBreakdown[d.category]) {
        categoryBreakdown[d.category] = { amount: 0, count: 0 };
      }
      categoryBreakdown[d.category].amount += d.amount;
      categoryBreakdown[d.category].count += 1;
    });

    res.json({
      success: true,
      data: {
        totalDonated,
        thisYearTotal,
        thisMonthTotal,
        childrenSupported: childrenSet.size,
        totalDonations: donations.length,
        monthlyTrend,
        categoryBreakdown,
        recentDonations: donations.slice(0, 5)
      }
    });

  } catch (error) {
    console.error('Get donor dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get donor's donation history
exports.getDonorHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = { donor: req.user.id };
    
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;

    const donations = await Donation.find(filter)
      .populate('dedicatedTo', 'personalInfo childId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments(filter);

    res.json({
      success: true,
      data: donations,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get donor history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const {
      amount,
      currency,
      type,
      category,
      paymentMethod,
      dedicatedTo,
      message,
      isAnonymous
    } = req.body;

    const donation = new Donation({
      donor: req.user.id,
      amount,
      currency: currency || 'RWF',
      type: type || 'one-time',
      category: category || 'general',
      paymentMethod,
      dedicatedTo: dedicatedTo || [],
      message,
      isAnonymous: isAnonymous || false,
      status: 'completed', // In production, this would be 'pending' until payment confirmation
      processedAt: new Date()
    });

    await donation.save();

    res.status(201).json({
      success: true,
      data: donation,
      message: 'Donation created successfully'
    });

  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
