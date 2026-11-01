require('dotenv').config();
const express = require('express');
const cors = require('cors');
const giftsRouter = require('./giftRoutes');
const searchRouter = require('./searchRoutes');
const authRouter = require('./authRoutes');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/gifts', giftsRouter);
app.use('/api/search', searchRouter);
app.use('/api/auth', authRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`GiftLink API listening on port ${port}`));
