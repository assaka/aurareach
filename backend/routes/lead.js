import express from 'express';
import LeadController from '../controllers/LeadController.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();
const leadController = new LeadController();

// GET /api/leads - Get all leads with pagination
router.get('/', leadController.getAll);

// GET /api/leads/search?q=term - Search leads
router.get('/search', leadController.search);

// GET /api/leads/stats - Get lead statistics
router.get('/stats', leadController.getStats);

// GET /api/leads/high-intent - Get high intent leads
router.get('/high-intent', leadController.getHighIntentLeads);

// GET /api/leads/industry-distribution - Get industry distribution
router.get('/industry-distribution', leadController.getIndustryDistribution);

// GET /api/leads/tech-stack - Get leads by tech stack
router.get('/tech-stack', leadController.getByTechStack);

// GET /api/leads/status/:status - Get leads by status
router.get('/status/:status', leadController.getByStatus);

// GET /api/leads/industry/:industry - Get leads by industry
router.get('/industry/:industry', leadController.getByIndustry);

// GET /api/leads/company-size/:size - Get leads by company size
router.get('/company-size/:size', leadController.getByCompanySize);

// GET /api/leads/count - Get lead count
router.get('/count', leadController.count);

// GET /api/leads/:id - Get lead by ID
router.get('/:id', leadController.getById);

// POST /api/leads - Create new lead
router.post('/', 
  validateRequest(schemas.lead.create), 
  leadController.create
);

// PUT /api/leads/:id - Update lead
router.put('/:id', 
  validateRequest(schemas.lead.update), 
  leadController.update
);

// PUT /api/leads/:id/update-activity - Update last activity timestamp
router.put('/:id/update-activity', leadController.updateLastActivity);

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', leadController.delete);

export default router;