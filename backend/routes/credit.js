import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';

const router = express.Router();
const creditService = new BaseService('credits');
const creditController = new BaseController(creditService);

router.get('/', creditController.getAll);
router.get('/count', creditController.count);
router.get('/:id', creditController.getById);
router.post('/', creditController.create);
router.put('/:id', creditController.update);
router.delete('/:id', creditController.delete);

export default router;