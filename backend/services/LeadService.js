import BaseService from './BaseService.js';
import pool from '../config/database.js';

class LeadService extends BaseService {
  constructor() {
    super('leads');
  }

  async findByStatus(status, options = {}) {
    return this.findAll({ ...options, where: { status } });
  }

  async findByIndustry(industry, options = {}) {
    return this.findAll({ ...options, where: { industry } });
  }

  async findByCompanySize(companySize, options = {}) {
    return this.findAll({ ...options, where: { company_size: companySize } });
  }

  async searchLeads(searchTerm, options = {}) {
    const { page = 1, limit = 10, sort = 'desc', sortBy = 'created_at' } = options;
    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM ${this.tableName}
      WHERE 
        company_name ILIKE $1 OR 
        contact_name ILIKE $1 OR 
        contact_email ILIKE $1 OR 
        industry ILIKE $1 OR
        location ILIKE $1
      ORDER BY ${sortBy} ${sort.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM ${this.tableName}
      WHERE 
        company_name ILIKE $1 OR 
        contact_name ILIKE $1 OR 
        contact_email ILIKE $1 OR 
        industry ILIKE $1 OR
        location ILIKE $1
    `;

    const searchPattern = `%${searchTerm}%`;
    
    const [result, countResult] = await Promise.all([
      pool.query(query, [searchPattern, limit, offset]),
      pool.query(countQuery, [searchPattern])
    ]);

    const total = parseInt(countResult.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getLeadStats() {
    const query = `
      SELECT 
        status,
        COUNT(*) as count,
        AVG(intent_score) as avg_intent_score
      FROM ${this.tableName}
      GROUP BY status
      ORDER BY count DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  async getHighIntentLeads(minScore = 70, options = {}) {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM ${this.tableName}
      WHERE intent_score >= $1 AND status IN ('new', 'contacted')
      ORDER BY intent_score DESC, created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM ${this.tableName}
      WHERE intent_score >= $1 AND status IN ('new', 'contacted')
    `;

    const [result, countResult] = await Promise.all([
      pool.query(query, [minScore, limit, offset]),
      pool.query(countQuery, [minScore])
    ]);

    const total = parseInt(countResult.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async updateLastActivity(id) {
    const query = `
      UPDATE ${this.tableName}
      SET last_activity = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async findByTechStack(techStack, options = {}) {
    const { page = 1, limit = 10, sort = 'desc', sortBy = 'created_at' } = options;
    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM ${this.tableName}
      WHERE tech_stack && $1
      ORDER BY ${sortBy} ${sort.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM ${this.tableName}
      WHERE tech_stack && $1
    `;

    const [result, countResult] = await Promise.all([
      pool.query(query, [techStack, limit, offset]),
      pool.query(countQuery, [techStack])
    ]);

    const total = parseInt(countResult.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getIndustryDistribution() {
    const query = `
      SELECT 
        industry,
        COUNT(*) as count,
        AVG(intent_score) as avg_intent_score
      FROM ${this.tableName}
      WHERE industry IS NOT NULL
      GROUP BY industry
      ORDER BY count DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }
}

export default LeadService;