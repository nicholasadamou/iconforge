#!/bin/bash

# IconForge Deployment Script
# This script helps you deploy to Vercel quickly

set -e

echo "🔥 IconForge Deployment Script"
echo "================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo ""
    echo "Installing Vercel CLI globally..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
    echo ""
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
    echo ""
fi

# Ask deployment type
echo "Select deployment type:"
echo "  1) Development/Preview"
echo "  2) Production"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Vercel (Preview)..."
        vercel
        ;;
    2)
        echo ""
        echo "🚀 Deploying to Vercel (Production)..."
        vercel --prod
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 View your deployments at: https://vercel.com/dashboard"
