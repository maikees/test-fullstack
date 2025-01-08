# Full Stack Challenge Project

## Overview
This project demonstrates a full-stack application built with the following technologies:

- **Backend**: NestJS, MongoDB
- **Frontend**: React, Material UI, Storybook
- **Cloud Integration**: AWS services simulated via LocalStack
- **Infrastructure**: Docker, Docker Compose, Serverless Framework

## Features

### Backend
- **CRUD Operations** for:
  - Products
  - Categories
  - Orders
- **Relationships**:
  - Products ↔ Categories (Many-to-Many)
  - Products ↔ Orders
- **Data Validation**: Ensures data integrity using DTOs.
- **Sales Dashboard**: Aggregate queries for KPIs like total orders, revenue, and average order value.
- **Presigned URL**: Generates AWS S3 URLs for image uploads.

### Frontend
- **Products Page**:
  - List, create, edit, and delete products.
  - Upload product images to S3.
- **Categories Page**:
  - List, create, edit, and delete categories.
- **Orders Page**:
  - List, create, edit, and delete orders.
- **Dashboard**:
  - Visualize KPIs with charts and metrics.
- **Storybook**:
  - Documented components: `ProductTable`, `ProductForm`.

### Infrastructure
- **MongoDB**: Database for storing application data.
- **LocalStack**: Simulates AWS services (S3).
- **Serverless Framework**: Deploys Lambda functions for background tasks.
- **Docker Compose**: Manages multi-container services for development.

---

## Getting Started

### Prerequisites
- **Docker**: Ensure Docker is installed and running.
- **Node.js**: For local development.
- **Serverless Framework**: Install globally using `npm install -g serverless`.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fullstack-challenge.git
   cd fullstack-challenge
   ```
2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. Access the services:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:4000](http://localhost:4000)

---

## File Structure

### Backend
```
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── dtos/
│   └── app.module.ts
├── Dockerfile
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── ProductTable.jsx
│   │   ├── ProductForm.jsx
│   │   ├── CategoryTable.jsx
│   │   ├── OrderTable.jsx
│   ├── pages/
│   │   ├── ProductsPage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── DashboardPage.jsx
│   └── index.js
├── public/
└── package.json
```

### Infrastructure
```
.
├── docker-compose.yml
├── serverless.yml
└── README.md
```

---

## Testing

### Backend
- Run unit tests:
  ```bash
  cd backend
  npm test
  ```

### Frontend
- Start Storybook:
  ```bash
  cd frontend
  npm run storybook
  ```
- Access Storybook at [http://localhost:6006](http://localhost:6006).

---

## Deployment

### Serverless Framework
Deploy the Lambda functions to AWS:
```bash
serverless deploy
```

---

## Environment Variables
Ensure the following environment variables are set:

### Backend
- `MONGO_URI`: MongoDB connection string.
- `S3_BUCKET`: Name of the S3 bucket.
- `AWS_REGION`: AWS region.
