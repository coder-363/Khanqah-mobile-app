# Khanqah Project

This repository contains the **Khanqah Mobile Application** and the **Admin Dashboard**.

## Project Structure

```
├── khanqah-app/        # React Native / Expo Mobile Application
├── admin-dashboard/    # Vite + React Admin Web Dashboard
└── khanqah-design.html # Design preview / mockups
```

## Getting Started

### 1. Mobile App (`khanqah-app`)
```bash
cd khanqah-app
npm install
npm start
```

### 2. Admin Dashboard (`admin-dashboard`)
```bash
cd admin-dashboard
npm install
cp .env.example .env.local  # Populate your Firebase credentials
npm run dev
```
