import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';

const router = express.Router();
const datasourceService = new BaseService('datasources');
const datasourceController = new BaseController(datasourceService);

router.get('/', datasourceController.getAll);
router.get('/count', datasourceController.count);
router.get('/:id', datasourceController.getById);
router.post('/', datasourceController.create);
router.put('/:id', datasourceController.update);
router.delete('/:id', datasourceController.delete);

export default router;