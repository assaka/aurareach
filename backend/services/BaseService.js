import pool from '../config/database.js';

class BaseService {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findAll(options = {}) {
    const { 
      page = 1, 
      limit = 10, 
      sort = 'desc', 
      sortBy = 'created_at',
      where = {},
      select = '*'
    } = options;
    
    const offset = (page - 1) * limit;
    let query = `SELECT ${select} FROM ${this.tableName}`;
    const values = [];
    let paramCount = 0;

    // Build WHERE clause
    const whereConditions = [];
    Object.entries(where).forEach(([key, value]) => {
      paramCount++;
      whereConditions.push(`${key} = $${paramCount}`);
      values.push(value);
    });

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    query += ` ORDER BY ${sortBy} ${sort.toUpperCase()}`;
    query += ` LIMIT $${++paramCount} OFFSET $${++paramCount}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    
    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) FROM ${this.tableName}`;
    const countValues = [];
    if (whereConditions.length > 0) {
      countQuery += ` WHERE ${whereConditions.join(' AND ')}`;
      countValues.push(...Object.values(where));
    }
    
    const countResult = await pool.query(countQuery, countValues);
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

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`);

    const query = `
      INSERT INTO ${this.tableName} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map((col, index) => `${col} = $${index + 2}`);

    const query = `
      UPDATE ${this.tableName}
      SET ${setClause.join(', ')}
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id, ...values]);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async exists(id) {
    const query = `SELECT 1 FROM ${this.tableName} WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }

  async count(where = {}) {
    let query = `SELECT COUNT(*) FROM ${this.tableName}`;
    const values = [];
    
    const whereConditions = [];
    Object.entries(where).forEach(([key, value], index) => {
      whereConditions.push(`${key} = $${index + 1}`);
      values.push(value);
    });

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    const result = await pool.query(query, values);
    return parseInt(result.rows[0].count);
  }
}

export default BaseService;