const { MongoClient } = require('mongodb');

let client;
let database;

async function connectToDatabase() {
  if (database) return database;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured');
  client = new MongoClient(uri);
  await client.connect();
  database = client.db();
  console.log(`Connected to MongoDB database: ${database.databaseName}`);
  return database;
}

module.exports = { connectToDatabase };
