# Aura SEO Backend API

A Node.js/Express backend API that replaces the base44 SDK with a custom PostgreSQL-based solution.

## Features

- RESTful API for all entities (Keywords, Leads, Campaigns, etc.)
- PostgreSQL database with complete schema
- JWT authentication
- Input validation with Joi
- Rate limiting and security middleware
- Comprehensive CRUD operations
- Search and filtering capabilities
- Pagination support

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Set up PostgreSQL database:**
   ```bash
   # Create database
   createdb aura_seo
   
   # Run migrations
   npm run migrate
   ```

4. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Keywords
- `GET /api/keywords` - Get all keywords (paginated)
- `GET /api/keywords/search?q=term` - Search keywords
- `GET /api/keywords/stats` - Get keyword statistics
- `GET /api/keywords/opportunities` - Get top opportunities
- `GET /api/keywords/:id` - Get keyword by ID
- `POST /api/keywords` - Create new keyword
- `PUT /api/keywords/:id` - Update keyword
- `DELETE /api/keywords/:id` - Delete keyword

### Leads
- `GET /api/leads` - Get all leads (paginated)
- `GET /api/leads/search?q=term` - Search leads
- `GET /api/leads/stats` - Get lead statistics
- `GET /api/leads/high-intent` - Get high intent leads
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Other Entities
Similar CRUD endpoints exist for:
- `/api/campaigns`
- `/api/posts`
- `/api/autoschedules`
- `/api/datasources`
- `/api/destinations`
- `/api/conversations`
- `/api/credits`
- `/api/leadcampaigns`
- `/api/mailboxes`
- `/api/outreachcampaigns`

## Database Schema

The database includes tables for all entities with:
- UUID primary keys
- Proper foreign key relationships
- JSON columns for flexible data
- Indexes for performance
- Automatic timestamps
- Data validation constraints

## Architecture

```
backend/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, error handling
├── routes/         # API route definitions
├── services/       # Business logic layer
├── scripts/        # Migration and utility scripts
└── server.js       # Application entry point
```

## Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aura_seo
DB_USER=postgres
DB_PASSWORD=password
PORT=3001
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

## Migration from base44

The new API client (`src/api/apiClient.js`) provides the same interface as base44 but connects to our custom backend. All existing frontend code should work without modification.

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run linting
npm run lint

# Run tests
npm test

# Reset database
npm run migrate
```