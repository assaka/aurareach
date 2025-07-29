import express from 'express';
import BaseController from '../controllers/BaseController.js';
import BaseService from '../services/BaseService.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();
const postService = new BaseService('posts');
const postController = new BaseController(postService);

// GET /api/posts - Get all posts
router.get('/', postController.getAll);

// GET /api/posts/count - Get post count
router.get('/count', postController.count);

// GET /api/posts/:id - Get post by ID
router.get('/:id', postController.getById);

// POST /api/posts - Create new post
router.post('/', 
  validateRequest(schemas.post.create), 
  postController.create
);

// PUT /api/posts/:id - Update post
router.put('/:id', 
  validateRequest(schemas.post.update), 
  postController.update
);

// DELETE /api/posts/:id - Delete post
router.delete('/:id', postController.delete);

export default router;