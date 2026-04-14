const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// POST /api/leads - Public: Submit new lead/application
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('budget').isIn(['50L - 1Cr', '1Cr - 1.5Cr', '1.5Cr - 2Cr', '2Cr - 5Cr', '5Cr+']).withMessage('Valid budget range is required'),
    body('landAvailability').isIn(['Yes - Own Land', 'Yes - Leased', 'No - Need Assistance', 'Under Negotiation']).withMessage('Land availability is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const lead = new Lead(req.body);
      await lead.save();

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully! Our team will contact you within 24 hours.',
        lead: { id: lead._id, name: lead.name, status: lead.status }
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to submit application. Please try again.' });
    }
  }
);

// GET /api/leads - Admin: Get all leads with filters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, location, budget, page = 1, limit = 20, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (budget) filter.budget = budget;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      leads,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// PATCH /api/leads/:id - Admin: Update lead status
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const update = {};
    if (status) update.status = status;
    if (notes) update.notes = notes;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE /api/leads/:id - Admin: Delete lead
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

module.exports = router;
