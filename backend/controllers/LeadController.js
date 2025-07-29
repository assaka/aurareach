import BaseController from './BaseController.js';
import LeadService from '../services/LeadService.js';

class LeadController extends BaseController {
  constructor() {
    super(new LeadService());
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

      const result = await this.service.searchLeads(searchTerm, options);
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

  getByIndustry = async (req, res, next) => {
    try {
      const { industry } = req.params;
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort || 'desc',
        sortBy: req.query.sortBy || 'created_at'
      };

      const result = await this.service.findByIndustry(industry, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getByCompanySize = async (req, res, next) => {
    try {
      const { size } = req.params;
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort || 'desc',
        sortBy: req.query.sortBy || 'created_at'
      };

      const result = await this.service.findByCompanySize(size, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getStats = async (req, res, next) => {
    try {
      const stats = await this.service.getLeadStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  getHighIntentLeads = async (req, res, next) => {
    try {
      const minScore = parseInt(req.query.minScore) || 70;
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
      };

      const result = await this.service.getHighIntentLeads(minScore, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  updateLastActivity = async (req, res, next) => {
    try {
      const { id } = req.params;
      const lead = await this.service.updateLastActivity(id);
      
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      
      res.json(lead);
    } catch (error) {
      next(error);
    }
  };

  getByTechStack = async (req, res, next) => {
    try {
      const { tech } = req.query;
      
      if (!tech) {
        return res.status(400).json({ error: 'Tech stack filter is required' });
      }

      const techStack = Array.isArray(tech) ? tech : [tech];
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort || 'desc',
        sortBy: req.query.sortBy || 'created_at'
      };

      const result = await this.service.findByTechStack(techStack, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getIndustryDistribution = async (req, res, next) => {
    try {
      const distribution = await this.service.getIndustryDistribution();
      res.json(distribution);
    } catch (error) {
      next(error);
    }
  };
}

export default LeadController;