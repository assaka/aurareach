import BaseController from './BaseController.js';
import KeywordService from '../services/KeywordService.js';

class KeywordController extends BaseController {
  constructor() {
    super(new KeywordService());
  }

  search = async (req, res, next) => {
    try {
      const { q: searchTerm } = req.query;
      
      if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
      }

      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort || 'desc',
        sortBy: req.query.sortBy || 'created_at'
      };

      const result = await this.service.searchKeywords(searchTerm, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getByStatus = async (req, res, next) => {
    try {
      const { status } = req.params;
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort || 'desc',
        sortBy: req.query.sortBy || 'created_at'
      };

      const result = await this.service.findByStatus(status, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort || 'desc',
        sortBy: req.query.sortBy || 'created_at'
      };

      const result = await this.service.findByCategory(category, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getStats = async (req, res, next) => {
    try {
      const stats = await this.service.getKeywordStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  getTopOpportunities = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const opportunities = await this.service.getTopOpportunities(limit);
      res.json(opportunities);
    } catch (error) {
      next(error);
    }
  };

  updateLastUpdated = async (req, res, next) => {
    try {
      const { id } = req.params;
      const keyword = await this.service.updateLastUpdated(id);
      
      if (!keyword) {
        return res.status(404).json({ error: 'Keyword not found' });
      }
      
      res.json(keyword);
    } catch (error) {
      next(error);
    }
  };
}

export default KeywordController;