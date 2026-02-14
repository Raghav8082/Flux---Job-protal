import app from '../backend/app.js';
import connectDB from '../backend/utils/db.js';

let isDbConnected = false;

export default async function handler(req, res) {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
  }

  return app(req, res);
}
