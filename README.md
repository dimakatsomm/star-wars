# Star Wars API Limiter Service

## Introduction
The Star Wars API Limiter Service is designed to manage and limit requests to the Star Wars API, ensuring efficient and controlled access to its resources. This service is built with Node.js and utilizes Express for routing, Mongoose for MongoDB interactions, and Redis for caching and rate limiting.

## Features
- **Authentication**: Secure access through JWT-based authentication.
- **Rate Limiting**: Limits the number of API requests to prevent abuse.
- **Caching**: Improves response times and reduces load on the Star Wars API by caching frequently requested data.
- **Data Modeling**: Utilizes Mongoose for robust data modeling and interaction with MongoDB.
- **Error Handling**: Comprehensive error handling and logging for easier debugging and maintenance.

## Technologies
- Node.js
- Express
- MongoDB/Mongoose
- Redis
- JWT for authentication
- Axios for HTTP requests

## Setup
To set up the project locally, follow these steps:
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up your MongoDB and Redis instances.
4. Create a `.env` file based on the `.env.example` template with your configuration values.
5. Build the project with `npm run build`.
6. Start the server with `npm start` for production or `npm run dev` for development.

## Usage
After setting up the project, you can start making requests to the provided endpoints for authentication, rate-limited access to the Star Wars API, and user management.

For detailed API documentation, refer to the `api.spec.yaml` file in the `spec` directory.
