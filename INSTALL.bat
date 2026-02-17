@echo off
echo Installing QuickShop...
echo.
echo Installing Backend Dependencies...
cd backend
call npm install
cd ..
echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..
echo.
echo Installation Complete!
echo.
echo To start the application:
echo 1. Open backend/.env and configure MongoDB URI
echo 2. Run: npm start (from backend folder)
echo 3. Open another terminal and run: npm start (from frontend folder)
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
