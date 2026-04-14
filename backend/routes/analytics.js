const express = require('express');
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// GET /api/analytics/dashboard - Admin dashboard stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const contactedLeads = await Lead.countDocuments({ status: 'contacted' });
    const qualifiedLeads = await Lead.countDocuments({ status: 'qualified' });
    const approvedLeads = await Lead.countDocuments({ status: 'approved' });
    const rejectedLeads = await Lead.countDocuments({ status: 'rejected' });

    // Leads by budget
    const budgetBreakdown = await Lead.aggregate([
      { $group: { _id: '$budget', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Leads by location
    const locationBreakdown = await Lead.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Leads over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const leadsOverTime = await Lead.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Conversion rate
    const conversionRate = totalLeads > 0
      ? ((approvedLeads / totalLeads) * 100).toFixed(1)
      : 0;

    res.json({
      overview: {
        totalLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        approvedLeads,
        rejectedLeads,
        conversionRate
      },
      budgetBreakdown,
      locationBreakdown,
      leadsOverTime
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
