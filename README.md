# Lab49 AI Consultant

A full-stack web application for AI consulting services, built with React, TypeScript, Express, and Drizzle ORM.

## Overview

Lab49 AI Consultant is a platform that offers AI consulting services with different subscription plans. The application includes user authentication, subscription management, and a responsive UI built with modern web technologies.

## Features

- **User Authentication**: Secure login and registration system
- **Subscription Plans**: Multiple pricing tiers with different features
- **Responsive Design**: Modern UI built with Tailwind CSS and Shadcn UI components
- **API Integration**: RESTful API endpoints for data management

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI (based on Radix UI)
- React Query for data fetching
- React Hook Form for form handling
- Zod for schema validation

### Backend
- Express.js
- TypeScript
- Drizzle ORM for database operations
- PostgreSQL (via NeonDB serverless)
- Passport.js for authentication

### Development Tools
- Vite for fast development and building
- TypeScript for type safety
- ESBuild for efficient bundling

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and API clients
│   │   └── pages/          # Page components
├── server/                 # Backend Express application
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage and retrieval
│   └── vite.ts             # Vite integration for development
└── shared/                 # Shared code between client and server
    └── schema.ts           # Data schemas and types
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd lab49-ai-consultant
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user
- `POST /api/auth/logout` - Logout the current user
- `GET /api/user` - Get the current user

### Subscription
- `GET /api/plans` - Get all subscription plans
- `POST /api/subscribe` - Subscribe to a plan
- `GET /api/subscriptions/:email` - Get subscription details for a user

## Deployment

The application is configured for deployment on Vercel with the following setup:
- Frontend is built with Vite
- Backend is deployed as serverless functions
- Database is hosted on NeonDB serverless PostgreSQL

## License

MIT