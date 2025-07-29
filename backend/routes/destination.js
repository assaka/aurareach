import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';

const router = express.Router();
const destinationService = new BaseService('destinations');
const destinationController = new BaseController(destinationService);

router.get('/', destinationController.getAll);
router.get('/count', destinationController.count);
router.get('/:id', destinationController.getById);
router.post('/', destinationController.create);
router.put('/:id', destinationController.update);
router.delete('/:id', destinationController.delete);

export default router;