const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getAuthHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
    };

    const config = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Generic CRUD operations for any entity
  async getAll(entityType, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/${entityType}${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getById(entityType, id) {
    return this.makeRequest(`/${entityType}/${id}`);
  }

  async create(entityType, data) {
    return this.makeRequest(`/${entityType}`, {
      method: 'POST',
      body: data,
    });
  }

  async update(entityType, id, data) {
    return this.makeRequest(`/${entityType}/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async delete(entityType, id) {
    return this.makeRequest(`/${entityType}/${id}`, {
      method: 'DELETE',
    });
  }

  async count(entityType, where = {}) {
    const params = where ? { where: JSON.stringify(where) } : {};
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/${entityType}/count${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  // Authentication
  async login(email, password) {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(email, password) {
    const response = await this.makeRequest('/auth/register', {
      method: 'POST',
      body: { email, password },
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  logout() {
    this.setToken(null);
  }

  // Specific entity methods

  // Keywords
  async searchKeywords(query, params = {}) {
    const searchParams = { q: query, ...params };
    const queryString = new URLSearchParams(searchParams).toString();
    return this.makeRequest(`/keywords/search?${queryString}`);
  }

  async getKeywordStats() {
    return this.makeRequest('/keywords/stats');
  }

  async getKeywordOpportunities(limit = 10) {
    return this.makeRequest(`/keywords/opportunities?limit=${limit}`);
  }

  async getKeywordsByStatus(status, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/keywords/status/${status}${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getKeywordsByCategory(category, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/keywords/category/${category}${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  // Leads
  async searchLeads(query, params = {}) {
    const searchParams = { q: query, ...params };
    const queryString = new URLSearchParams(searchParams).toString();
    return this.makeRequest(`/leads/search?${queryString}`);
  }

  async getLeadStats() {
    return this.makeRequest('/leads/stats');
  }

  async getHighIntentLeads(minScore = 70, params = {}) {
    const searchParams = { minScore, ...params };
    const queryString = new URLSearchParams(searchParams).toString();
    return this.makeRequest(`/leads/high-intent?${queryString}`);
  }

  async getLeadsByStatus(status, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/leads/status/${status}${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getLeadsByIndustry(industry, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/leads/industry/${industry}${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getLeadsByCompanySize(size, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/leads/company-size/${size}${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getLeadsByTechStack(techArray, params = {}) {
    const searchParams = { ...params };
    techArray.forEach(tech => {
      searchParams[`tech`] = tech;
    });
    const queryString = new URLSearchParams(searchParams).toString();
    return this.makeRequest(`/leads/tech-stack?${queryString}`);
  }

  async getIndustryDistribution() {
    return this.makeRequest('/leads/industry-distribution');
  }

  async updateLeadActivity(leadId) {
    return this.makeRequest(`/leads/${leadId}/update-activity`, {
      method: 'PUT',
    });
  }

  // Health check
  async healthCheck() {
    return fetch(`${this.baseURL.replace('/api', '')}/health`).then(res => res.json());
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();
export default apiClient;