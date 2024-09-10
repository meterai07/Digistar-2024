# E-commerce API

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/meterai07/Digistar-2024.git
   cd e-commerce-api
   ```

2. **Install dependencies**:

   Make sure you have [Node.js](https://nodejs.org/) installed.

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:

   You will need to configure environment variables for the application to connect to MongoDB and other services.

   Copy the `.env.example` file to `.env`:
   ```bash
    cp .env.example .env
   ```
   Then, open the `.env` file and update the variables with your specific configuration:
   ```env
    MONGO_URI=mongodb://localhost:27017/your-database-name
    PORT=3000
    JWT_SECRET=example
   ```

4. **Start the application**:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.

## Usage

### Running the server locally

Once the server is up and running, you can make HTTP requests to the API using Postman. Below are some of the basic routes available (you can view the complete API documentation [here](#api-documentation)).

## API Documentation

You can find the full API documentation, including all endpoints, request formats, and response formats, in the Postman documentation link below:

[Postman API Documentation](https://documenter.getpostman.com/view/20875079/2sAXjSyohY)