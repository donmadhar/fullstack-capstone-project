# Full Stack Capstone Project

GiftLink is a full-stack gift sharing application built with React, Node.js, Express and MongoDB.

## Features
- Browse gifts and view item details
- Search gifts by category and keyword
- Register and log in with JWT authentication
- Sentiment analysis endpoint
- MongoDB persistence

## Tech stack
React, Node.js, Express, MongoDB, JWT, bcryptjs, natural.

## Getting started
1. Copy `.env.example` to `giftlink-backend/.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. Start MongoDB.
3. In `giftlink-backend`, run `npm install`, then `npm run seed`, then `npm start`.
4. In `giftlink-frontend`, run `npm install` and `npm start`.
5. Configure `REACT_APP_API_URL` to the backend URL.

## Deployment
Deploy the backend and frontend to your chosen hosting provider. Add secrets through the provider's environment settings; never commit `.env`.

## Unsolved problems
- Configure production MongoDB and deployment URLs.
- Add production-grade validation, rate limiting, email verification and password reset.

## Future enhancements
- Image uploads, saved gifts, messaging, moderation and advanced recommendations.
