import BaseService from './BaseService.js';
import pool from '../config/database.js';

class KeywordService extends BaseService {
  constructor() {
    super('keywords');
  }

  async findByStatus(status, options = {}) {
    return this.findAll({ ...options, where: { status } });
  }

  async findByCategory(category, options = {}) {
    return this.findAll({ ...options, where: { category } });
  }

  async searchKeywords(searchTerm, options = {}) {
    const { page = 1, limit = 10, sort = 'desc', sortBy = 'created_at' } = options;
    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM ${this.tableName}
      WHERE keyword ILIKE $1 OR category ILIKE $1 OR notes ILIKE $1
      ORDER BY ${sortBy} ${sort.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM ${this.tableName}
      WHERE keyword ILIKE $1 OR category ILIKE $1 OR notes ILIKE $1
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

  async getKeywordStats() {
    const query = `
      SELECT 
        status,
        COUNT(*) as count,
        AVG(search_volume) as avg_search_volume,
        AVG(cpc) as avg_cpc,
        AVG(opportunity_score) as avg_opportunity_score
      FROM ${this.tableName}
      GROUP BY status
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  async getTopOpportunities(limit = 10) {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE status = 'active' AND opportunity_score IS NOT NULL
      ORDER BY opportunity_score DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  async updateLastUpdated(id) {
    const query = `
      UPDATE ${this.tableName}
      SET last_updated = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default KeywordService;