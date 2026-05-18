#!/bin/bash

# TODO App - Deployment Setup Script
# This script helps you prepare your code for deployment

echo "════════════════════════════════════════════════════════"
echo "  TODO App - Deployment Setup"
echo "════════════════════════════════════════════════════════"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Visit: https://git-scm.com/download"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Initialize git repo if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: TODO app with React + Express + PostgreSQL"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "  NEXT STEPS:"
echo "════════════════════════════════════════════════════════"
echo ""
echo "1. Create a GitHub account (if you don't have one):"
echo "   → https://github.com/signup"
echo ""
echo "2. Create a new repository on GitHub:"
echo "   → Go to https://github.com/new"
echo "   → Repository name: 'todo-app'"
echo "   → Make it PUBLIC"
echo ""
echo "3. Connect your local repo to GitHub:"
echo "   $ git remote add origin https://github.com/YOUR_USERNAME/todo-app.git"
echo "   $ git branch -M main"
echo "   $ git push -u origin main"
echo ""
echo "4. Create accounts for hosting:"
echo "   → Frontend: https://vercel.com (GitHub login)"
echo "   → Backend:  https://railway.app (GitHub login)"
echo ""
echo "5. Follow DEPLOY_CHECKLIST.md for step-by-step deployment"
echo ""
echo "════════════════════════════════════════════════════════"
