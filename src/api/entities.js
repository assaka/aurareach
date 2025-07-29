import apiClient from './apiClient.js';

// Entity classes that provide convenient methods for CRUD operations
class EntityBase {
  constructor(entityType) {
    this.entityType = entityType;
  }

  async findAll(params = {}) {
    return apiClient.getAll(this.entityType, params);
  }

  async findById(id) {
    return apiClient.getById(this.entityType, id);
  }

  async create(data) {
    return apiClient.create(this.entityType, data);
  }

  async update(id, data) {
    return apiClient.update(this.entityType, id, data);
  }

  async delete(id) {
    return apiClient.delete(this.entityType, id);
  }

  async count(where = {}) {
    return apiClient.count(this.entityType, where);
  }
}

class KeywordEntity extends EntityBase {
  constructor() {
    super('keywords');
  }

  async search(query, params = {}) {
    return apiClient.searchKeywords(query, params);
  }

  async getStats() {
    return apiClient.getKeywordStats();
  }

  async getOpportunities(limit = 10) {
    return apiClient.getKeywordOpportunities(limit);
  }

  async findByStatus(status, params = {}) {
    return apiClient.getKeywordsByStatus(status, params);
  }

  async findByCategory(category, params = {}) {
    return apiClient.getKeywordsByCategory(category, params);
  }
}

class LeadEntity extends EntityBase {
  constructor() {
    super('leads');
  }

  async search(query, params = {}) {
    return apiClient.searchLeads(query, params);
  }

  async getStats() {
    return apiClient.getLeadStats();
  }

  async getHighIntent(minScore = 70, params = {}) {
    return apiClient.getHighIntentLeads(minScore, params);
  }

  async findByStatus(status, params = {}) {
    return apiClient.getLeadsByStatus(status, params);
  }

  async findByIndustry(industry, params = {}) {
    return apiClient.getLeadsByIndustry(industry, params);
  }

  async findByCompanySize(size, params = {}) {
    return apiClient.getLeadsByCompanySize(size, params);
  }

  async findByTechStack(techArray, params = {}) {
    return apiClient.getLeadsByTechStack(techArray, params);
  }

  async getIndustryDistribution() {
    return apiClient.getIndustryDistribution();
  }

  async updateActivity(id) {
    return apiClient.updateLeadActivity(id);
  }
}

// Export entity instances
export const Keyword = new KeywordEntity();
export const Destination = new EntityBase('destinations');
export const DataSource = new EntityBase('datasources');
export const Post = new EntityBase('posts');
export const Credit = new EntityBase('credits');
export const AutoSchedule = new EntityBase('autoschedules');
export const Campaign = new EntityBase('campaigns');
export const Lead = new LeadEntity();
export const LeadCampaign = new EntityBase('leadcampaigns');
export const OutreachCampaign = new EntityBase('outreachcampaigns');
export const Conversation = new EntityBase('conversations');
export const Mailbox = new EntityBase('mailboxes');

// Auth methods
export const User = {
  async login(email, password) {
    return apiClient.login(email, password);
  },
  
  async register(email, password) {
    return apiClient.register(email, password);
  },
  
  logout() {
    return apiClient.logout();
  }
};