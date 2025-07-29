import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';

const router = express.Router();
const outreachcampaignService = new BaseService('outreachcampaigns');
const outreachcampaignController = new BaseController(outreachcampaignService);

router.get('/', outreachcampaignController.getAll);
router.get('/count', outreachcampaignController.count);
router.get('/:id', outreachcampaignController.getById);
router.post('/', outreachcampaignController.create);
router.put('/:id', outreachcampaignController.update);
router.delete('/:id', outreachcampaignController.delete);

export default router;