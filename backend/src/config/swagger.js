import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Lynqer API",
            version: "1.0.0",
            description: "API Documentation for Lynqer (URL Shortener, Auth, etc.)",
        },
        servers: [
            {
                url: process.env.BASE_URL || "http://localhost:5000/api",
                description: "Development Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to the API docs
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;
