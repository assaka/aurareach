import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';

const router = express.Router();
const mailboxService = new BaseService('mailboxes');
const mailboxController = new BaseController(mailboxService);

router.get('/', mailboxController.getAll);
router.get('/count', mailboxController.count);
router.get('/:id', mailboxController.getById);
router.post('/', mailboxController.create);
router.put('/:id', mailboxController.update);
router.delete('/:id', mailboxController.delete);

export default router;