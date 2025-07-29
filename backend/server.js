import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';
import { validateRequest } from './middleware/validation.js';

// Import routes
import autoscheduleRoutes from './routes/autoschedule.js';
import campaignRoutes from './routes/campaign.js';
import conversationRoutes from './routes/conversation.js';
import creditRoutes from './routes/credit.js';
import datasourceRoutes from './routes/datasource.js';
import destinationRoutes from './routes/destination.js';
import keywordRoutes from './routes/keyword.js';
import leadRoutes from './routes/lead.js';
import leadcampaignRoutes from './routes/leadcampaign.js';
import mailboxRoutes from './routes/mailbox.js';
import outreachcampaignRoutes from './routes/outreachcampaign.js';
import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/autoschedules', authMiddleware, autoscheduleRoutes);
app.use('/api/campaigns', authMiddleware, campaignRoutes);
app.use('/api/conversations', authMiddleware, conversationRoutes);
app.use('/api/credits', authMiddleware, creditRoutes);
app.use('/api/datasources', authMiddleware, datasourceRoutes);
app.use('/api/destinations', authMiddleware, destinationRoutes);
app.use('/api/keywords', authMiddleware, keywordRoutes);
app.use('/api/leads', authMiddleware, leadRoutes);
app.use('/api/leadcampaigns', authMiddleware, leadcampaignRoutes);
app.use('/api/mailboxes', authMiddleware, mailboxRoutes);
app.use('/api/outreachcampaigns', authMiddleware, outreachcampaignRoutes);
app.use('/api/posts', authMiddleware, postRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;