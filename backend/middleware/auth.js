import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Optional: Verify user still exists in database
    // const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [decoded.userId]);
    // if (userResult.rows.length === 0) {
    //   return res.status(401).json({ error: 'Invalid token. User not found.' });
    // }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};