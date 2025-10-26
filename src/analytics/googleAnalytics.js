// Google Analytics 4 Configuration for Shorthand Tutor App
// Campaign tracking and conversion measurement

// Initialize Google Analytics
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

// Track page views with UTM parameters
export const trackPageView = (path, title, utmParams = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: window.location.href,
      custom_map: {
        'utm_source': 'source',
        'utm_medium': 'medium', 
        'utm_campaign': 'campaign',
        'utm_content': 'content',
        'utm_term': 'term'
      }
    });
    
    // Track UTM parameters
    if (Object.keys(utmParams).length > 0) {
      gtag('event', 'campaign_visit', {
        source: utmParams.utm_source,
        medium: utmParams.utm_medium,
        campaign: utmParams.utm_campaign,
        content: utmParams.utm_content,
        term: utmParams.utm_term
      });
    }
  }
};

// Track conversion events
export const trackConversion = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'conversion',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      campaign_source: parameters.source || '',
      custom_parameter_1: parameters.custom1 || '',
      custom_parameter_2: parameters.custom2 || ''
    });
  }
};

// Track campaign-specific events
export const trackCampaignEvent = (campaignType, action, details = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', `campaign_${action}`, {
      event_category: 'campaign',
      event_label: campaignType,
      campaign_type: campaignType,
      action_type: action,
      target_institution: details.institution || '',
      email_type: details.emailType || '',
      social_platform: details.platform || ''
    });
  }
};

// Track user engagement with shorthand features
export const trackShorthandEngagement = (featureType, engagementLevel, details = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'shorthand_engagement', {
      event_category: 'feature_usage',
      event_label: featureType,
      engagement_level: engagementLevel,
      session_duration: details.duration || 0,
      wpm_improvement: details.wpmImprovement || 0,
      module_completed: details.moduleCompleted || false,
      difficulty_level: details.difficulty || 'beginner'
    });
  }
};

// Extract UTM parameters from URL
export const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term')
  };
};

// Set up enhanced e-commerce tracking
export const trackEnhancedEcommerce = (action, items = []) => {
  if (typeof gtag !== 'undefined') {
    switch(action) {
      case 'view_item':
        gtag('event', 'view_item', {
          currency: 'USD',
          value: items[0]?.value || 0,
          items: items
        });
        break;
      case 'add_to_cart':
        gtag('event', 'add_to_cart', {
          currency: 'USD',
          value: items[0]?.value || 0,
          items: items
        });
        break;
      case 'purchase':
        gtag('event', 'purchase', {
          transaction_id: Date.now().toString(),
          currency: 'USD',
          value: items.reduce((sum, item) => sum + (item.value || 0), 0),
          items: items
        });
        break;
    }
  }
};
