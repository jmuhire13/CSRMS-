@echo off
echo Starting CSRMS Backend Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if package.json exists
if not exist package.json (
    echo Error: package.json not found
    echo Please run this script from the csrms-backend directory
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
)

REM Check if .env file exists
if not exist .env (
    echo Warning: .env file not found
    echo Creating default .env file...
    echo NODE_ENV=development > .env
    echo PORT=5000 >> .env
    echo FRONTEND_URL=http://localhost:5173 >> .env
    echo MONGODB_URI=mongodb://localhost:27017/csrms >> .env
    echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
    echo JWT_EXPIRE=7d >> .env
    echo.
    echo Please update the .env file with your actual configuration
    echo.
)

REM Start the server
echo Starting CSRMS Backend Server on port 5000...
echo Press Ctrl+C to stop the server
echo.
npm run dev

pause