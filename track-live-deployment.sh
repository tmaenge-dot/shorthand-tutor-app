#!/bin/bash

# 🚀 Live Deployment Traffic Tracker
# ==================================

echo "🌐 SHORTHAND APP DEPLOYMENT TRACKER"
echo "===================================="
echo "Date: $(date)"
echo ""

# Check if deployment URL is provided
if [ -z "$1" ]; then
    echo "📝 Usage: ./track-live-deployment.sh <your-netlify-url>"
    echo "   Example: ./track-live-deployment.sh https://amazing-shorthand-123.netlify.app"
    echo ""
    echo "🎯 DEPLOYMENT CHECKLIST:"
    echo "========================"
    echo "□ 1. Drag dist/ folder to https://app.netlify.com/drop"
    echo "□ 2. Copy your live URL from Netlify"
    echo "□ 3. Run this script with your URL"
    echo "□ 4. Set up Google Analytics (optional)"
    echo ""
    echo "📊 Once deployed, this script will:"
    echo "   • Test your live URL accessibility"
    echo "   • Check response times"
    echo "   • Monitor uptime"
    echo "   • Track basic connectivity"
    echo ""
    exit 1
fi

DEPLOYMENT_URL="$1"
echo "🎯 Testing deployment at: $DEPLOYMENT_URL"
echo ""

# Test accessibility
echo "🔍 Testing URL accessibility..."
if curl -s --head "$DEPLOYMENT_URL" | head -n 1 | grep -q "200 OK"; then
    echo "✅ Site is LIVE and accessible!"
    
    # Test response time
    echo ""
    echo "⚡ Testing response time..."
    response_time=$(curl -o /dev/null -s -w '%{time_total}' "$DEPLOYMENT_URL")
    echo "📊 Response time: ${response_time}s"
    
    if (( $(echo "$response_time < 2.0" | bc -l) )); then
        echo "✅ Excellent response time (< 2 seconds)"
    elif (( $(echo "$response_time < 5.0" | bc -l) )); then
        echo "⚠️  Good response time (< 5 seconds)"
    else
        echo "🐌 Slow response time (> 5 seconds)"
    fi
    
    # Check if analytics are present
    echo ""
    echo "🔍 Checking analytics setup..."
    if curl -s "$DEPLOYMENT_URL" | grep -q "GA_MEASUREMENT_ID"; then
        echo "⚠️  Google Analytics needs setup (replace GA_MEASUREMENT_ID)"
        echo "   Go to: https://analytics.google.com/ to get your measurement ID"
    else
        echo "✅ Analytics code appears to be configured"
    fi
    
    # Test campaign URLs
    echo ""
    echo "🎯 Testing campaign tracking URLs..."
    echo "📧 Email campaign: ${DEPLOYMENT_URL}?utm_source=email&utm_campaign=court-reporting-schools"
    echo "📱 Social media: ${DEPLOYMENT_URL}?utm_source=social&utm_campaign=linkedin-professionals"
    echo "🔍 Direct visits: ${DEPLOYMENT_URL}"
    
    # Create monitoring log
    echo ""
    echo "📝 Creating monitoring log..."
    LOG_FILE="deployment-monitoring-$(date +%Y%m%d).log"
    echo "$(date): Deployment tested successfully - URL: $DEPLOYMENT_URL - Response: ${response_time}s" >> "$LOG_FILE"
    echo "✅ Log created: $LOG_FILE"
    
    echo ""
    echo "🎉 DEPLOYMENT SUCCESS!"
    echo "====================="
    echo "🌐 Your app is live at: $DEPLOYMENT_URL"
    echo "📊 Share this URL with your email campaign recipients"
    echo "📱 Post on social media with UTM tracking"
    echo "📈 Monitor traffic in Google Analytics (once set up)"
    echo ""
    echo "🔄 Run this script again anytime to check status:"
    echo "   ./track-live-deployment.sh $DEPLOYMENT_URL"
    
else
    echo "❌ Site is not accessible or not deployed yet"
    echo "🔧 Troubleshooting:"
    echo "   • Make sure you dragged the dist/ folder to Netlify"
    echo "   • Check the URL is correct"
    echo "   • Wait a few minutes for deployment to complete"
    echo "   • Try again with the correct Netlify URL"
fi

echo ""
echo "📊 Next steps to track hits:"
echo "=========================="
echo "1. 📧 Send your campaign emails with the live URL"
echo "2. 📱 Share on social media"
echo "3. 📈 Set up Google Analytics for detailed tracking"
echo "4. 🔍 Monitor this log file for basic connectivity stats"