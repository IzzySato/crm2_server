# Customer Relationship Management (CRM) System - Backend

## Overview
This repository contains the backend code for the Customer Relationship Management (CRM) system. The backend is built using Node.js and MongoDB, providing a robust and scalable solution for managing customer and product information.

## Technologies
- Node.js
- MongoDB
- Redis
- JWT
- Passport (OAuth)
- CircleCI
- AWS S3
- Jest

## Features
- **Secure Authentication:** Utilizes JWT and Passport for OAuth to ensure secure access.
- **Efficient Data Management:** MongoDB is used to store and manage customer and product information.
- **Image Storage:** AWS S3 is integrated for secure and efficient image storage.
- **Continuous Integration:** CircleCI is employed for continuous integration and delivery.
- **Comprehensive Testing:** Jest is used for thorough backend testing to ensure reliability.

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/IzzySato/crm2_server.git
  cd crm2_server
  ```

2. Install dependencies
```bash
  npm install
```

3. Set up environment variables
MONGO_URI=mongo_url
IOREDIS_URL=redis_url
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:8080
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_secret
GOOGLE_API_KEY=google_api_key
SESSION_SECRET=session
JWT_SECRET=jwt
S3_ACCESS_KEY_ID=s3_access_id
S3_SECRET_ACCESS_KEY=s3_secret_access_key

4.  Run the server
```bash
# listening to the port 8080
npm start
```

5. Test (Jest)
```bash
npm test
```
