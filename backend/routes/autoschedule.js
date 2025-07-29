import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();
const autoscheduleService = new BaseService('autoschedules');
const autoscheduleController = new BaseController(autoscheduleService);

// GET /api/autoschedules - Get all autoschedules
router.get('/', autoscheduleController.getAll);

// GET /api/autoschedules/count - Get autoschedule count
router.get('/count', autoscheduleController.count);

// GET /api/autoschedules/:id - Get autoschedule by ID
router.get('/:id', autoscheduleController.getById);

// POST /api/autoschedules - Create new autoschedule
router.post('/', 
  validateRequest(schemas.autoschedule.create), 
  autoscheduleController.create
);

// PUT /api/autoschedules/:id - Update autoschedule
router.put('/:id', 
  validateRequest(schemas.autoschedule.update), 
  autoscheduleController.update
);

// DELETE /api/autoschedules/:id - Delete autoschedule
router.delete('/:id', autoscheduleController.delete);

export default router;