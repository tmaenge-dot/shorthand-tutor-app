// Campaign Tracking Middleware
// Automatically tracks campaign sources and conversions

import { trackPageView, trackCampaignEvent, getUTMParameters } from '../analytics/googleAnalytics.js';

export class CampaignTracker {
  constructor() {
    this.utmParams = getUTMParameters();
    this.sessionData = {
      startTime: Date.now(),
      pageViews: 0,
      interactions: 0,
      conversions: []
    };
    
    this.initTracking();
  }
  
  initTracking() {
    // Track initial page load with UTM parameters
    if (this.hasUTMParams()) {
      trackPageView(window.location.pathname, document.title, this.utmParams);
      this.identifyCampaignType();
    }
    
    // Set up automatic event tracking
    this.setupEventListeners();
    this.startSessionTracking();
  }
  
  hasUTMParams() {
    return Object.values(this.utmParams).some(param => param !== null);
  }
  
  identifyCampaignType() {
    const { utm_campaign, utm_source, utm_content } = this.utmParams;
    
    if (utm_campaign === 'court-reporting-schools') {
      this.trackInstitutionalVisit('court_reporting_school', utm_content);
    } else if (utm_source === 'social' && utm_campaign === 'linkedin-professionals') {
      this.trackSocialVisit('linkedin', 'professional_targeting');
    } else if (utm_source === 'social' && utm_campaign === 'facebook-groups') {
      this.trackSocialVisit('facebook', 'community_engagement');
    }
  }
  
  trackInstitutionalVisit(institutionType, institutionId) {
    trackCampaignEvent('institutional_outreach', 'visit', {
      institution: institutionId,
      emailType: 'direct_outreach'
    });
    
    // Store for conversion attribution
    localStorage.setItem('campaign_source', JSON.stringify({
      type: 'institutional',
      institution: institutionId,
      timestamp: Date.now()
    }));
  }
  
  trackSocialVisit(platform, campaignType) {
    trackCampaignEvent('social_media', 'visit', {
      platform: platform,
      campaignType: campaignType
    });
    
    localStorage.setItem('campaign_source', JSON.stringify({
      type: 'social',
      platform: platform,
      timestamp: Date.now()
    }));
  }
  
  setupEventListeners() {
    // Track demo requests
    document.addEventListener('click', (event) => {
      if (event.target.matches('[data-track="demo-request"]')) {
        this.trackConversion('demo_request');
      }
      
      if (event.target.matches('[data-track="signup"]')) {
        this.trackConversion('user_signup');
      }
      
      if (event.target.matches('[data-track="module-start"]')) {
        this.trackConversion('module_start');
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', (event) => {
      if (event.target.matches('[data-track="contact-form"]')) {
        this.trackConversion('contact_form_submission');
      }
    });
  }
  
  trackConversion(conversionType) {
    const campaignSource = JSON.parse(localStorage.getItem('campaign_source') || '{}');
    
    trackCampaignEvent('conversion', conversionType, {
      institution: campaignSource.institution || '',
      platform: campaignSource.platform || '',
      timeFromVisit: Date.now() - (campaignSource.timestamp || Date.now())
    });
    
    this.sessionData.conversions.push({
      type: conversionType,
      timestamp: Date.now(),
      source: campaignSource
    });
  }
  
  startSessionTracking() {
    // Track session duration and engagement
    setInterval(() => {
      this.sessionData.pageViews++;
      
      // Send engagement data every 30 seconds
      if (this.sessionData.pageViews % 6 === 0) { // Every 3 minutes
        this.sendEngagementData();
      }
    }, 30000);
    
    // Track when user leaves
    window.addEventListener('beforeunload', () => {
      this.sendSessionData();
    });
  }
  
  sendEngagementData() {
    const sessionDuration = Date.now() - this.sessionData.startTime;
    const engagementLevel = this.calculateEngagementLevel(sessionDuration);
    
    trackShorthandEngagement('session_progress', engagementLevel, {
      duration: sessionDuration,
      pageViews: this.sessionData.pageViews,
      interactions: this.sessionData.interactions
    });
  }
  
  calculateEngagementLevel(duration) {
    if (duration < 60000) return 'low'; // Less than 1 minute
    if (duration < 180000) return 'medium'; // Less than 3 minutes
    if (duration < 600000) return 'high'; // Less than 10 minutes
    return 'very_high'; // More than 10 minutes
  }
  
  sendSessionData() {
    const sessionDuration = Date.now() - this.sessionData.startTime;
    const campaignSource = JSON.parse(localStorage.getItem('campaign_source') || '{}');
    
    // Send final session data
    if (typeof navigator.sendBeacon !== 'undefined') {
      const data = JSON.stringify({
        sessionDuration,
        pageViews: this.sessionData.pageViews,
        conversions: this.sessionData.conversions.length,
        campaignSource,
        utmParams: this.utmParams
      });
      
      navigator.sendBeacon('/api/track-session', data);
    }
  }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  window.campaignTracker = new CampaignTracker();
}
