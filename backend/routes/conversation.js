import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';

const router = express.Router();
const conversationService = new BaseService('conversations');
const conversationController = new BaseController(conversationService);

router.get('/', conversationController.getAll);
router.get('/count', conversationController.count);
router.get('/:id', conversationController.getById);
router.post('/', conversationController.create);
router.put('/:id', conversationController.update);
router.delete('/:id', conversationController.delete);

export default router;