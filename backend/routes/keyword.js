import express from 'express';
import KeywordController from '../controllers/KeywordController.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();
const keywordController = new KeywordController();

// GET /api/keywords - Get all keywords with pagination
router.get('/', keywordController.getAll);

// GET /api/keywords/search?q=term - Search keywords
router.get('/search', keywordController.search);

// GET /api/keywords/stats - Get keyword statistics
router.get('/stats', keywordController.getStats);

// GET /api/keywords/opportunities - Get top opportunities
router.get('/opportunities', keywordController.getTopOpportunities);

// GET /api/keywords/status/:status - Get keywords by status
router.get('/status/:status', keywordController.getByStatus);

// GET /api/keywords/category/:category - Get keywords by category
router.get('/category/:category', keywordController.getByCategory);

// GET /api/keywords/count - Get keyword count
router.get('/count', keywordController.count);

// GET /api/keywords/:id - Get keyword by ID
router.get('/:id', keywordController.getById);

// POST /api/keywords - Create new keyword
router.post('/', 
  validateRequest(schemas.keyword.create), 
  keywordController.create
);

// PUT /api/keywords/:id - Update keyword
router.put('/:id', 
  validateRequest(schemas.keyword.update), 
  keywordController.update
);

// PUT /api/keywords/:id/update-timestamp - Update last_updated timestamp
router.put('/:id/update-timestamp', keywordController.updateLastUpdated);

// DELETE /api/keywords/:id - Delete keyword
router.delete('/:id', keywordController.delete);

export default router;