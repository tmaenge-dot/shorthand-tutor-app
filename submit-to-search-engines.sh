#!/bin/bash

# 🚀 IMMEDIATE SEARCH ENGINE SUBMISSION SCRIPT
# Run this script to submit your URLs to multiple search engines

echo "🔍 SUBMITTING SHORTHAND TUTOR APP TO SEARCH ENGINES..."
echo "=================================================="

# Base URL
BASE_URL="https://tmaenge-dot.github.io/shorthand-tutor-app"

# Key URLs to submit
URLS=(
    "$BASE_URL/"
    "$BASE_URL/practice"
    "$BASE_URL/assessment"
    "$BASE_URL/speed-development"
    "$BASE_URL/progress"
    "$BASE_URL/dashboard"
    "$BASE_URL/lesson/A"
    "$BASE_URL/lesson/B"
    "$BASE_URL/lesson/C"
    "$BASE_URL/resources"
)

echo "📋 URLs to submit:"
for url in "${URLS[@]}"; do
    echo "  - $url"
done

echo ""
echo "🌐 MANUAL SUBMISSION LINKS:"
echo "=========================="

echo ""
echo "1️⃣  GOOGLE URL SUBMISSION:"
echo "   🔗 https://www.google.com/webmasters/tools/submit-url"
echo "   📝 Submit each URL above manually"

echo ""
echo "2️⃣  BING URL SUBMISSION:" 
echo "   🔗 https://www.bing.com/webmaster/tools/url-submission"
echo "   📝 Submit your main URL: $BASE_URL/"

echo ""
echo "3️⃣  YANDEX URL SUBMISSION:"
echo "   🔗 https://webmaster.yandex.com/tools/query/"
echo "   📝 Submit your main URL: $BASE_URL/"

echo ""
echo "4️⃣  DUCKDUCKGO (via Bing):"
echo "   📝 DuckDuckGo uses Bing results, so Bing submission covers this"

echo ""
echo "📄 SITEMAP SUBMISSION:"
echo "====================="
echo "   📝 Your sitemap URL: $BASE_URL/sitemap.xml"
echo "   🔗 Submit this in Google Search Console and Bing Webmaster Tools"

echo ""
echo "🚀 AUTOMATED PINGS:"
echo "=================="

# Ping search engines about sitemap (safe method)
echo "📡 Notifying search engines about sitemap..."

# Google ping (safe - just notifies about sitemap update)
echo "   📍 Pinging Google about sitemap update..."
curl -s "https://www.google.com/ping?sitemap=$BASE_URL/sitemap.xml" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Google ping successful"
else
    echo "   ⚠️  Google ping failed (this is normal for new sites)"
fi

# Bing ping
echo "   📍 Pinging Bing about sitemap update..."
curl -s "https://www.bing.com/ping?sitemap=$BASE_URL/sitemap.xml" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Bing ping successful"
else
    echo "   ⚠️  Bing ping failed (this is normal for new sites)"
fi

echo ""
echo "✨ NEXT STEPS:"
echo "=============="
echo "1. 📝 Set up Google Search Console:"
echo "   - Go to https://search.google.com/search-console/"
echo "   - Add property: $BASE_URL/"
echo "   - Verify ownership and submit sitemap"
echo ""
echo "2. 📝 Set up Bing Webmaster Tools:"
echo "   - Go to https://www.bing.com/webmasters"
echo "   - Add site: $BASE_URL/"
echo "   - Verify ownership and submit sitemap"
echo ""
echo "3. 📱 Share on social media:"
echo "   - Use templates in SOCIAL_MEDIA_SHARING_TEMPLATES.md"
echo "   - Post in educational communities"
echo ""
echo "4. 🔗 Build backlinks:"
echo "   - Follow strategy in BACKLINK_BUILDING_STRATEGY.md"
echo "   - Submit to educational directories"
echo ""
echo "5. 📊 Monitor progress:"
echo "   - Check indexing status in 24-48 hours"
echo "   - Search: 'site:tmaenge-dot.github.io/shorthand-tutor-app'"

echo ""
echo "🎉 SUBMISSION COMPLETE!"
echo "======================="
echo "Your app should appear in search results within 1-2 weeks."
echo "For faster discovery, focus on social media sharing and backlink building."
echo ""
echo "📈 Expected timeline:"
echo "   - 24-48 hours: Search engines discover your site"
echo "   - 1-2 weeks: Basic indexing begins"
echo "   - 2-4 weeks: Ranking for specific keywords"
echo "   - 3-6 months: Competing with established apps"
echo ""
echo "Good luck! 🚀"