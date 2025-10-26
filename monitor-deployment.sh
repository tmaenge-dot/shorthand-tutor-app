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
