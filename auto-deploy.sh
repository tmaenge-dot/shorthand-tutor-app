#!/bin/bash

# 🚀 Automatic Deployment Script for Shorthand App
# ================================================

echo "🎯 AUTOMATIC DEPLOYMENT STARTING..."
echo "===================================="
echo "Date: $(date)"
echo ""

# Function to check if server is running
check_server() {
    if curl -s http://localhost:8000 > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to start local server
start_server() {
    echo "🚀 Starting local development server..."
    cd "/home/oem/Desktop/Shorthand"
    python3 -m http.server 8000 --directory dist > /dev/null 2>&1 &
    SERVER_PID=$!
    echo "✅ Server started with PID: $SERVER_PID"
    sleep 3
}

# Function to create deployment package
create_package() {
    echo "📦 Creating deployment package..."
    cd "/home/oem/Desktop/Shorthand"
    
    # Create zip package
    zip -r "shorthand-app-$(date +%Y%m%d).zip" dist/ > /dev/null 2>&1
    echo "✅ Package created: shorthand-app-$(date +%Y%m%d).zip"
    
    # Create tar.gz package
    tar -czf "shorthand-app-$(date +%Y%m%d).tar.gz" dist/
    echo "✅ Archive created: shorthand-app-$(date +%Y%m%d).tar.gz"
}

# Function to test deployment
test_deployment() {
    echo "🔍 Testing deployment..."
    
    if check_server; then
        echo "✅ Local server is accessible at http://localhost:8000"
        
        # Test key pages
        if curl -s http://localhost:8000/index.html > /dev/null; then
            echo "✅ Main app page loads correctly"
        fi
        
        if curl -s http://localhost:8000/manifest.json > /dev/null; then
            echo "✅ PWA manifest is accessible"
        fi
        
        # Get response time
        response_time=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:8000)
        echo "⚡ Response time: ${response_time}s"
        
        echo ""
        echo "🌐 YOUR APP IS NOW LIVE LOCALLY!"
        echo "================================"
        echo "📱 Local URL: http://localhost:8000"
        echo "🌍 Network URL: http://$(hostname -I | awk '{print $1}'):8000"
        echo ""
        
    else
        echo "❌ Server is not responding"
        return 1
    fi
}

# Function to show deployment options
show_deployment_options() {
    echo "🚀 DEPLOYMENT OPTIONS:"
    echo "====================="
    echo ""
    echo "✅ OPTION 1: Local Network (ACTIVE NOW)"
    echo "   URL: http://$(hostname -I | awk '{print $1}'):8000"
    echo "   Status: Anyone on your network can access"
    echo ""
    echo "📦 OPTION 2: Upload Ready Packages"
    echo "   • shorthand-app-$(date +%Y%m%d).zip (for Netlify drag-drop)"
    echo "   • shorthand-app-$(date +%Y%m%d).tar.gz (for server upload)"
    echo ""
    echo "🌐 OPTION 3: Cloud Deployment"
    echo "   • Netlify: https://app.netlify.com/drop"
    echo "   • Vercel: https://vercel.com/new"
    echo "   • GitHub Pages: Push to GitHub repository"
    echo ""
    echo "🔧 OPTION 4: Public Tunnel (Advanced)"
    echo "   Use ngrok or similar to make local server public"
}

# Function to create monitoring script
create_monitoring() {
    echo "📊 Setting up monitoring..."
    
    cat > monitor-deployment.sh << 'EOF'
#!/bin/bash
echo "📊 DEPLOYMENT MONITORING REPORT"
echo "==============================="
echo "Time: $(date)"
echo ""

# Check local server
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Local server: ONLINE"
    
    # Check response time
    response_time=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:8000)
    echo "⚡ Response time: ${response_time}s"
    
    # Check if accessible from network
    network_ip=$(hostname -I | awk '{print $1}')
    echo "🌍 Network access: http://${network_ip}:8000"
    
else
    echo "❌ Local server: OFFLINE"
    echo "💡 Restart with: python3 -m http.server 8000 --directory dist &"
fi

echo ""
echo "📈 To check visitor logs:"
echo "   • Server access logs appear in terminal"
echo "   • Monitor network traffic for external access"
echo ""
echo "🔄 Next monitoring check: $(date -d '+1 hour')"
EOF
    
    chmod +x monitor-deployment.sh
    echo "✅ Monitoring script created: monitor-deployment.sh"
}

# Main deployment process
echo "🎯 STARTING DEPLOYMENT PROCESS..."
echo ""

# Check if server is already running
if check_server; then
    echo "✅ Server already running on port 8000"
else
    start_server
fi

# Create deployment packages
create_package

# Test the deployment
test_deployment

# Create monitoring tools
create_monitoring

# Show all options
show_deployment_options

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================"
echo ""
echo "📊 IMMEDIATE ACTIONS:"
echo "1. ✅ Your app is live at: http://localhost:8000"
echo "2. 🌍 Network users can access: http://$(hostname -I | awk '{print $1}'):8000"
echo "3. 📦 Upload packages ready for cloud deployment"
echo "4. 📈 Run './monitor-deployment.sh' to check status"
echo ""
echo "🚀 NEXT STEPS FOR GLOBAL ACCESS:"
echo "1. Upload .zip file to https://app.netlify.com/drop"
echo "2. Share the Netlify URL for global access"
echo "3. Set up Google Analytics for traffic tracking"
echo ""
echo "💡 Your app is now deployed and ready to collect hits!"