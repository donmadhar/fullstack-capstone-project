const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('./db');

const router = express.Router();

// GET /api/gifts and GET /api/gifts/:id
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('gifts').find({}).sort({ name: 1 }).toArray();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve gifts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid gift id' });
    const db = await connectToDatabase();
    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(req.params.id) });
    if (!gift) return res.status(404).json({ error: 'Gift not found' });
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve gift' });
  }
});

module.exports = router;
