import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Teneo Vector Service API',
      version: '1.0.0',
      description: 'API documentation for your vector service',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/vector', // Updated base path for all endpoints
      },
    ],
  },
  apis: ['./src/**/*.js'], // Path to the API docs (adjust based on your structure)
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export {
    swaggerSpec,
    swaggerUi
}