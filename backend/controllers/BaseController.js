class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort || 'desc',
        sortBy: req.query.sortBy || 'created_at'
      };

      const result = await this.service.findAll(options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.findById(id);
      
      if (!item) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.update(id, req.body);
      
      if (!item) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.delete(id);
      
      if (!item) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  count = async (req, res, next) => {
    try {
      const where = req.query.where ? JSON.parse(req.query.where) : {};
      const count = await this.service.count(where);
      res.json({ count });
    } catch (error) {
      next(error);
    }
  };
}

export default BaseController;