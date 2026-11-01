const express = require('express');
const { connectToDatabase } = require('./db');

const router = express.Router();

// GET /api/search?category=books&q=novel
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const filter = {};
    if (req.query.category) filter.category = { $regex: String(req.query.category), $options: 'i' };
    if (req.query.q) {
      const term = String(req.query.q);
      filter.$or = [
        { name: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } }
      ];
    }
    const results = await db.collection('gifts').find(filter).toArray();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
