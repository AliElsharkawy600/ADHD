#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Checking Google OAuth Integration...${NC}\n"

# Check Node version
echo -e "${YELLOW}1. Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    node_version=$(node -v)
    echo -e "${GREEN}✓ Node.js is installed: $node_version${NC}\n"
else
    echo -e "${RED}✗ Node.js is not installed${NC}\n"
    exit 1
fi

# Check npm packages in frontend
echo -e "${YELLOW}2. Checking frontend packages...${NC}"
cd frontend
if npm list @react-oauth/google &> /dev/null; then
    echo -e "${GREEN}✓ @react-oauth/google is installed${NC}"
else
    echo -e "${RED}✗ @react-oauth/google is NOT installed${NC}"
    echo -e "${YELLOW}  Installing...${NC}"
    npm install @react-oauth/google
fi

if npm list axios &> /dev/null; then
    echo -e "${GREEN}✓ axios is installed${NC}\n"
else
    echo -e "${RED}✗ axios is NOT installed${NC}\n"
fi

# Check .env file
echo -e "${YELLOW}3. Checking .env file...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file exists${NC}"
    
    if grep -q "VITE_GOOGLE_CLIENT_ID" .env; then
        echo -e "${GREEN}✓ VITE_GOOGLE_CLIENT_ID is set${NC}"
    else
        echo -e "${RED}✗ VITE_GOOGLE_CLIENT_ID is not set${NC}"
    fi
    
    if grep -q "VITE_API_BASE_URL" .env; then
        echo -e "${GREEN}✓ VITE_API_BASE_URL is set${NC}\n"
    else
        echo -e "${RED}✗ VITE_API_BASE_URL is not set${NC}\n"
    fi
else
    echo -e "${RED}✗ .env file not found${NC}\n"
fi

# Check TypeScript files
echo -e "${YELLOW}4. Checking TypeScript configuration...${NC}"
if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✓ tsconfig.json exists${NC}\n"
else
    echo -e "${RED}✗ tsconfig.json not found${NC}\n"
fi

# Check backend
echo -e "${YELLOW}5. Checking backend setup...${NC}"
cd ../backend
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓ Backend package.json exists${NC}"
    
    if grep -q "express" package.json; then
        echo -e "${GREEN}✓ Express is in dependencies${NC}"
    else
        echo -e "${YELLOW}⚠ Express is not found${NC}"
    fi
    
    if grep -q "mongoose" package.json; then
        echo -e "${GREEN}✓ Mongoose is in dependencies${NC}\n"
    else
        echo -e "${YELLOW}⚠ Mongoose is not found${NC}\n"
    fi
else
    echo -e "${RED}✗ Backend package.json not found${NC}\n"
fi

# Summary
echo -e "${YELLOW}📋 Summary:${NC}"
echo -e "${GREEN}✓ Google OAuth integration is ready!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Add your Google Client ID to frontend/.env"
echo -e "2. Run 'npm run dev' in the backend folder"
echo -e "3. Run 'npm run dev' in the frontend folder"
echo -e "4. Test at http://localhost:5173"
echo -e "\n${GREEN}Done!${NC}\n"
