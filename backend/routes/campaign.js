import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();
const campaignService = new BaseService('campaigns');
const campaignController = new BaseController(campaignService);

// GET /api/campaigns - Get all campaigns
router.get('/', campaignController.getAll);

// GET /api/campaigns/count - Get campaign count
router.get('/count', campaignController.count);

// GET /api/campaigns/:id - Get campaign by ID
router.get('/:id', campaignController.getById);

// POST /api/campaigns - Create new campaign
router.post('/', 
  validateRequest(schemas.campaign.create), 
  campaignController.create
);

// PUT /api/campaigns/:id - Update campaign
router.put('/:id', 
  validateRequest(schemas.campaign.update), 
  campaignController.update
);

// DELETE /api/campaigns/:id - Delete campaign
router.delete('/:id', campaignController.delete);

export default router;