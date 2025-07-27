import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Keywords from "./Keywords";

import Destinations from "./Destinations";

import DataSources from "./DataSources";

import Credits from "./Credits";

import Analytics from "./Analytics";

import AutoSchedule from "./AutoSchedule";

import KeywordOverview from "./KeywordOverview";

import Campaigns from "./Campaigns";

import Posts from "./Posts";

import Leads from "./Leads";

import Outreach from "./Outreach";

import Inbox from "./Inbox";

import Landing from "./Landing";

import Mailboxes from "./Mailboxes";

import Features from "./Features";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Keywords: Keywords,
    
    Destinations: Destinations,
    
    DataSources: DataSources,
    
    Credits: Credits,
    
    Analytics: Analytics,
    
    AutoSchedule: AutoSchedule,
    
    KeywordOverview: KeywordOverview,
    
    Campaigns: Campaigns,
    
    Posts: Posts,
    
    Leads: Leads,
    
    Outreach: Outreach,
    
    Inbox: Inbox,
    
    Landing: Landing,
    
    Mailboxes: Mailboxes,
    
    Features: Features,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Keywords" element={<Keywords />} />
                
                <Route path="/Destinations" element={<Destinations />} />
                
                <Route path="/DataSources" element={<DataSources />} />
                
                <Route path="/Credits" element={<Credits />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/AutoSchedule" element={<AutoSchedule />} />
                
                <Route path="/KeywordOverview" element={<KeywordOverview />} />
                
                <Route path="/Campaigns" element={<Campaigns />} />
                
                <Route path="/Posts" element={<Posts />} />
                
                <Route path="/Leads" element={<Leads />} />
                
                <Route path="/Outreach" element={<Outreach />} />
                
                <Route path="/Inbox" element={<Inbox />} />
                
                <Route path="/Landing" element={<Landing />} />
                
                <Route path="/Mailboxes" element={<Mailboxes />} />
                
                <Route path="/Features" element={<Features />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}