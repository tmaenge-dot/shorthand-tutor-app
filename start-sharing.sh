#!/bin/bash

# Shorthand Tutor App - Network Sharing Setup
# Run this script to share the app with learners

echo "🎓 Shorthand Tutor App - Network Sharing Setup"
echo "=============================================="
echo ""

# Get IP address
echo "📡 Finding your IP address..."
IP_ADDRESS=$(hostname -I | awk '{print $1}')

if [ -z "$IP_ADDRESS" ]; then
    echo "❌ Could not determine IP address automatically."
    echo "💡 Please run 'ip addr show' to find your IP address manually."
    echo ""
else
    echo "✅ Your IP address: $IP_ADDRESS"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting the app for network sharing..."
echo ""
echo "📋 Instructions for learners:"
echo "   1. Connect to the same WiFi network as this computer"
echo "   2. Open a web browser"
echo "   3. Go to: http://$IP_ADDRESS:3001"
echo ""
echo "🔄 Starting server... (Press Ctrl+C to stop)"
echo "==============================================="
echo ""

# Start the development server with network access
npm run dev:network