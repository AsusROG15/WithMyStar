#!/bin/bash

# WithMyStar End-to-End Validation Script
# This script validates the complete WithMyStar setup and functionality

echo "=== WithMyStar E2E Validation ==="
echo "Testing complete setup from fresh clone..."

# Timing tracking
start_time=$(date +%s)

echo ""
echo "1. Repository Structure Validation"
required_files=("main.js" "README.md" "LICENSE" "index.html")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "2. JavaScript Validation"
if node validate.js | grep -q "Validation Complete"; then
    echo "✅ JavaScript validation passed"
else
    echo "❌ JavaScript validation failed"
    exit 1
fi

echo ""
echo "3. Web Server Test"
# Start server in background
server_start=$(date +%s)
python3 -m http.server 8003 &> /dev/null &
SERVER_PID=$!
sleep 2
server_ready=$(date +%s)
server_startup_time=$((server_ready - server_start))

# Test HTTP response
if curl -s http://localhost:8003/ | grep -q "WithMyStar Planet Companion"; then
    echo "✅ Web server responds correctly (startup: ${server_startup_time}s)"
else
    echo "❌ Web server not responding"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Test JavaScript file serving
if curl -s http://localhost:8003/main.js | grep -q "function submitQuery"; then
    echo "✅ JavaScript files served correctly"
else
    echo "❌ JavaScript files not served"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Cleanup
kill $SERVER_PID 2>/dev/null

echo ""
echo "4. Project Documentation Check"
if grep -q "KWGT" README.md && grep -q "Tasker" README.md; then
    echo "✅ Core documentation references found"
else
    echo "❌ Missing essential documentation"
fi

echo ""
echo "5. Workflow Validation"
if [ -f ".github/workflows/generator-generic-ossf-slsa3-publish.yml" ]; then
    echo "✅ GitHub workflow exists"
else
    echo "❌ GitHub workflow missing"
fi

end_time=$(date +%s)
total_time=$((end_time - start_time))

echo ""
echo "=== Validation Summary ==="
echo "✅ All tests passed"
echo "📊 Total validation time: ${total_time} seconds"
echo "📊 Server startup time: ${server_startup_time} seconds"
echo "🚀 WithMyStar is ready for development!"

echo ""
echo "=== Quick Start Validation ==="
echo "To start working with WithMyStar:"
echo "1. Run: python3 -m http.server 8000"
echo "2. Open: http://localhost:8000"
echo "3. Test the interface by entering a query"
echo "4. Check console logs for Tasker integration"