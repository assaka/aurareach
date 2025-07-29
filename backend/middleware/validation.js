import Joi from 'joi';

export const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    next();
  };
};

// Common validation schemas
export const schemas = {
  uuid: Joi.string().uuid(),
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('asc', 'desc').default('desc'),
    sortBy: Joi.string().default('created_at')
  }),
  
  autoschedule: {
    create: Joi.object({
      name: Joi.string().required(),
      keyword_ids: Joi.array().items(Joi.string()),
      destination_id: Joi.string().uuid(),
      data_source_id: Joi.string().uuid(),
      frequency: Joi.string().valid('daily', 'weekly', 'bi-weekly', 'monthly').default('weekly'),
      day_of_week: Joi.number().integer().min(0).max(6),
      time_of_day: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      include_video: Joi.boolean().default(false),
      include_document: Joi.boolean().default(false),
      is_active: Joi.boolean().default(true)
    }),
    update: Joi.object({
      name: Joi.string(),
      keyword_ids: Joi.array().items(Joi.string()),
      destination_id: Joi.string().uuid(),
      data_source_id: Joi.string().uuid(),
      frequency: Joi.string().valid('daily', 'weekly', 'bi-weekly', 'monthly'),
      day_of_week: Joi.number().integer().min(0).max(6),
      time_of_day: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      include_video: Joi.boolean(),
      include_document: Joi.boolean(),
      is_active: Joi.boolean()
    }).min(1)
  },
  
  campaign: {
    create: Joi.object({
      name: Joi.string().required(),
      source: Joi.string().valid('Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Twitter Ads', 'Other').required(),
      budget: Joi.number().positive().required(),
      status: Joi.string().valid('active', 'paused', 'completed', 'draft').default('draft'),
      start_date: Joi.date(),
      end_date: Joi.date().greater(Joi.ref('start_date'))
    }),
    update: Joi.object({
      name: Joi.string(),
      source: Joi.string().valid('Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Twitter Ads', 'Other'),
      budget: Joi.number().positive(),
      status: Joi.string().valid('active', 'paused', 'completed', 'draft'),
      spend: Joi.number().min(0),
      impressions: Joi.number().integer().min(0),
      clicks: Joi.number().integer().min(0),
      conversions: Joi.number().integer().min(0),
      start_date: Joi.date(),
      end_date: Joi.date()
    }).min(1)
  },
  
  keyword: {
    create: Joi.object({
      keyword: Joi.string().required(),
      search_volume: Joi.number().integer().min(0),
      cpc: Joi.number().min(0),
      competition: Joi.string().valid('low', 'medium', 'high').default('medium'),
      difficulty: Joi.string().valid('low', 'medium', 'high').default('medium'),
      status: Joi.string().valid('active', 'paused', 'archived').default('active'),
      category: Joi.string(),
      notes: Joi.string(),
      trend: Joi.string().valid('rising', 'stable', 'declining').default('stable'),
      opportunity_score: Joi.number().integer().min(0).max(100)
    }),
    update: Joi.object({
      keyword: Joi.string(),
      search_volume: Joi.number().integer().min(0),
      cpc: Joi.number().min(0),
      competition: Joi.string().valid('low', 'medium', 'high'),
      difficulty: Joi.string().valid('low', 'medium', 'high'),
      status: Joi.string().valid('active', 'paused', 'archived'),
      category: Joi.string(),
      notes: Joi.string(),
      trend: Joi.string().valid('rising', 'stable', 'declining'),
      opportunity_score: Joi.number().integer().min(0).max(100)
    }).min(1)
  },
  
  lead: {
    create: Joi.object({
      company_name: Joi.string().required(),
      website: Joi.string().uri(),
      industry: Joi.string(),
      company_size: Joi.string().valid('1-10', '11-50', '51-200', '201-1000', '1000+'),
      location: Joi.string(),
      revenue: Joi.string(),
      contact_name: Joi.string(),
      contact_title: Joi.string(),
      contact_email: Joi.string().email(),
      contact_linkedin: Joi.string().uri(),
      tech_stack: Joi.array().items(Joi.string()),
      social_intents: Joi.array().items(Joi.string()),
      intent_score: Joi.number().integer().min(0).max(100),
      status: Joi.string().valid('new', 'contacted', 'interested', 'meeting_booked', 'not_interested', 'unqualified', 'converted').default('new'),
      source: Joi.string(),
      notes: Joi.string()
    }),
    update: Joi.object({
      company_name: Joi.string(),
      website: Joi.string().uri(),
      industry: Joi.string(),
      company_size: Joi.string().valid('1-10', '11-50', '51-200', '201-1000', '1000+'),
      location: Joi.string(),
      revenue: Joi.string(),
      contact_name: Joi.string(),
      contact_title: Joi.string(),
      contact_email: Joi.string().email(),
      contact_linkedin: Joi.string().uri(),
      tech_stack: Joi.array().items(Joi.string()),
      social_intents: Joi.array().items(Joi.string()),
      intent_score: Joi.number().integer().min(0).max(100),
      status: Joi.string().valid('new', 'contacted', 'interested', 'meeting_booked', 'not_interested', 'unqualified', 'converted'),
      source: Joi.string(),
      notes: Joi.string()
    }).min(1)
  },
  
  post: {
    create: Joi.object({
      title: Joi.string().required(),
      content: Joi.string(),
      keyword: Joi.string().required(),
      status: Joi.string().valid('draft', 'generating', 'ready', 'published', 'failed').default('draft'),
      destination_id: Joi.string().uuid(),
      data_source_id: Joi.string().uuid(),
      campaign_id: Joi.string().uuid(),
      video_url: Joi.string().uri(),
      document_url: Joi.string().uri(),
      credits_used: Joi.number().integer().min(0).default(1),
      performance_data: Joi.object()
    }),
    update: Joi.object({
      title: Joi.string(),
      content: Joi.string(),
      keyword: Joi.string(),
      status: Joi.string().valid('draft', 'generating', 'ready', 'published', 'failed'),
      destination_id: Joi.string().uuid(),
      data_source_id: Joi.string().uuid(),
      campaign_id: Joi.string().uuid(),
      video_url: Joi.string().uri(),
      document_url: Joi.string().uri(),
      credits_used: Joi.number().integer().min(0),
      performance_data: Joi.object()
    }).min(1)
  }
};