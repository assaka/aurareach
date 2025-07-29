-- Initial database schema migration
-- Generated from entity definitions

-- Create databases extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- AutoSchedule table
CREATE TABLE autoschedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    keyword_ids TEXT[] DEFAULT '{}',
    destination_id UUID,
    data_source_id UUID,
    frequency VARCHAR(20) DEFAULT 'weekly' CHECK (frequency IN ('daily', 'weekly', 'bi-weekly', 'monthly')),
    day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
    time_of_day TIME,
    include_video BOOLEAN DEFAULT FALSE,
    include_document BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_run TIMESTAMP,
    next_run TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaign table
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    source VARCHAR(50) NOT NULL CHECK (source IN ('Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Twitter Ads', 'Other')),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('active', 'paused', 'completed', 'draft')),
    budget DECIMAL(10,2) NOT NULL,
    spend DECIMAL(10,2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    cpc DECIMAL(10,4) DEFAULT 0,
    ctr DECIMAL(5,2) DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lead table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    website VARCHAR(500),
    industry VARCHAR(100),
    company_size VARCHAR(20) CHECK (company_size IN ('1-10', '11-50', '51-200', '201-1000', '1000+')),
    location VARCHAR(255),
    revenue VARCHAR(100),
    contact_name VARCHAR(255),
    contact_title VARCHAR(255),
    contact_email VARCHAR(255),
    contact_linkedin VARCHAR(500),
    tech_stack TEXT[],
    social_intents TEXT[],
    intent_score INTEGER CHECK (intent_score >= 0 AND intent_score <= 100),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'meeting_booked', 'not_interested', 'unqualified', 'converted')),
    source VARCHAR(255),
    notes TEXT,
    last_activity TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversation table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL CHECK (platform IN ('linkedin', 'email', 'sms')),
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    last_message_preview TEXT,
    last_message_at TIMESTAMP,
    messages JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit table
CREATE TABLE credits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('purchase', 'weekly_free', 'bonus', 'refund')),
    description TEXT,
    expires_at TIMESTAMP,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DataSource table
CREATE TABLE datasources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('api', 'rss', 'csv', 'json', 'database', 'google_ads', 'google_search_console', 'semrush')),
    url VARCHAR(500),
    api_key VARCHAR(500),
    oauth_token TEXT,
    refresh_token TEXT,
    refresh_interval VARCHAR(20) DEFAULT 'daily' CHECK (refresh_interval IN ('hourly', 'daily', 'weekly', 'manual')),
    mapping JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    schema TEXT[],
    data TEXT,
    record_count INTEGER DEFAULT 0,
    last_sync TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Destination table
CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('website', 'blog', 'social_media', 'email', 'api', 'linkedin', 'brevo')),
    url VARCHAR(500),
    api_key VARCHAR(500),
    settings JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Keyword table
CREATE TABLE keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keyword VARCHAR(255) NOT NULL,
    search_volume INTEGER,
    cpc DECIMAL(10,4),
    competition VARCHAR(20) DEFAULT 'medium' CHECK (competition IN ('low', 'medium', 'high')),
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('low', 'medium', 'high')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
    category VARCHAR(100),
    notes TEXT,
    trend VARCHAR(20) DEFAULT 'stable' CHECK (trend IN ('rising', 'stable', 'declining')),
    opportunity_score INTEGER CHECK (opportunity_score >= 0 AND opportunity_score <= 100),
    last_updated TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LeadCampaign table
CREATE TABLE leadcampaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_criteria JSONB,
    keywords TEXT[],
    tech_filters TEXT[],
    company_size_filter TEXT[],
    industry_filter TEXT[],
    location_filter TEXT[],
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
    leads_found INTEGER DEFAULT 0,
    qualified_leads INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mailbox table
CREATE TABLE mailboxes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_address VARCHAR(255) NOT NULL UNIQUE,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('gmail', 'outlook', 'brevo', 'custom_smtp')),
    status VARCHAR(20) DEFAULT 'connecting' CHECK (status IN ('connecting', 'active', 'warming_up', 'error')),
    warmup_settings JSONB DEFAULT '{"is_enabled": true, "emails_per_day": 30, "reply_rate": 45}',
    analytics JSONB DEFAULT '{"health_score": 75, "emails_sent_today": 0, "landed_in_inbox": 0, "saved_from_spam": 0}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OutreachCampaign table
CREATE TABLE outreachcampaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(20) DEFAULT 'linkedin' CHECK (platform IN ('linkedin', 'email', 'sms')),
    status VARCHAR(20) DEFAULT 'paused' CHECK (status IN ('active', 'paused', 'completed')),
    steps JSONB DEFAULT '[]',
    leads TEXT[],
    analytics JSONB DEFAULT '{"sent": 0, "connected": 0, "replied": 0}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT,
    keyword VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'ready', 'published', 'failed')),
    destination_id UUID REFERENCES destinations(id),
    data_source_id UUID REFERENCES datasources(id),
    campaign_id UUID REFERENCES campaigns(id),
    video_url VARCHAR(500),
    document_url VARCHAR(500),
    published_at TIMESTAMP,
    credits_used INTEGER DEFAULT 1,
    performance_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_autoschedules_is_active ON autoschedules(is_active);
CREATE INDEX IF NOT EXISTS idx_autoschedules_next_run ON autoschedules(next_run);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_source ON campaigns(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_intent_score ON leads(intent_score);
CREATE INDEX IF NOT EXISTS idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_credits_type ON credits(type);
CREATE INDEX IF NOT EXISTS idx_credits_used ON credits(used);
CREATE INDEX IF NOT EXISTS idx_datasources_type ON datasources(type);
CREATE INDEX IF NOT EXISTS idx_datasources_is_active ON datasources(is_active);
CREATE INDEX IF NOT EXISTS idx_destinations_type ON destinations(type);
CREATE INDEX IF NOT EXISTS idx_destinations_is_active ON destinations(is_active);
CREATE INDEX IF NOT EXISTS idx_keywords_status ON keywords(status);
CREATE INDEX IF NOT EXISTS idx_keywords_keyword ON keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_leadcampaigns_status ON leadcampaigns(status);
CREATE INDEX IF NOT EXISTS idx_mailboxes_status ON mailboxes(status);
CREATE INDEX IF NOT EXISTS idx_mailboxes_email ON mailboxes(email_address);
CREATE INDEX IF NOT EXISTS idx_outreachcampaigns_status ON outreachcampaigns(status);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_keyword ON posts(keyword);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_autoschedules_updated_at BEFORE UPDATE ON autoschedules FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_credits_updated_at BEFORE UPDATE ON credits FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_datasources_updated_at BEFORE UPDATE ON datasources FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_keywords_updated_at BEFORE UPDATE ON keywords FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_leadcampaigns_updated_at BEFORE UPDATE ON leadcampaigns FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_mailboxes_updated_at BEFORE UPDATE ON mailboxes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_outreachcampaigns_updated_at BEFORE UPDATE ON outreachcampaigns FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();