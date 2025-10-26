// Add to main.jsx - Analytics Integration

import { CampaignTracker } from './middleware/campaignTracker.js';

// Initialize campaign tracking
const initializeCampaignTracking = () => {
  // Google Analytics 4 script
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(gaScript);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  
  // Make gtag globally available
  window.gtag = gtag;
  
  // Initialize campaign tracker
  new CampaignTracker();
};

// Call after DOM is ready
document.addEventListener('DOMContentLoaded', initializeCampaignTracking);
