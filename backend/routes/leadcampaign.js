import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';

const router = express.Router();
const leadcampaignService = new BaseService('leadcampaigns');
const leadcampaignController = new BaseController(leadcampaignService);

router.get('/', leadcampaignController.getAll);
router.get('/count', leadcampaignController.count);
router.get('/:id', leadcampaignController.getById);
router.post('/', leadcampaignController.create);
router.put('/:id', leadcampaignController.update);
router.delete('/:id', leadcampaignController.delete);

export default router;