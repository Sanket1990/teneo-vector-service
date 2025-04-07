# Teneo Vector Service

## Overview
The Teneo Vector Service is an Express-based API designed to process text, generate vector embeddings, and store them in a database. It also provides endpoints to retrieve embeddings and perform health checks.

## Features
- **Generate Embeddings**: Accepts raw text, splits it into chunks, generates embeddings, and stores them in a Supabase database.
- **Retrieve Embeddings**: Accepts a query, generates its embedding, and retrieves relevant data from the database.
- **Health Check**: Provides a simple endpoint to check the service's health.

## Project Structure
```
clients/         # External service clients (e.g., Supabase, Gemini)
config/          # Configuration files (e.g., Swagger)
sql/             # SQL scripts for database setup
src/             # Source code
  adapters/      # Abstraction layer for services
  routes/        # API route handlers
  services/      # Business logic and service integrations
  utils/         # Utility functions
```

## Endpoints
### 1. Generate Embeddings
**POST** `/api/vector/generateEmbeddings`
- **Description**: Processes text and stores vector embeddings.
- **Request Body**: Plain text.
- **Response**: Success message.

### 2. Retrieve Embeddings
**POST** `/api/vector/getEmbeddings`
- **Description**: Retrieves embeddings for a query.
- **Request Body**: Plain text query.
- **Response**: Relevant data.

### 3. Health Check
**GET** `/api/health`
- **Description**: Checks if the service is running.
- **Response**: Status message.

## Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd teneo-vector-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   SUPABASE_API_KEY=<your-supabase-api-key>
   SUPABASE_PROJECT_URL=<your-supabase-project-url>
   GEMINI_API_KEY=<your-gemini-api-key>
   ```

4. Start the server:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## Database Setup
1. Create the `content_vectors` table:
   ```sql
   create table content_vectors (
     id bigserial primary key,
     content text not null,
     embedding vector(768) not null
   );
   ```

2. Add the `match_content_vectors` function:
   ```sql
   create or replace function match_content_vectors (
     query_embedding vector(384),
     match_threshold float default 0.7,
     match_count int default 5
   )
   returns table (
     id bigint,
     content text,
     similarity float
   )
   language sql stable
   as $$
     select
       content_vectors.id,
       content_vectors.content,
       1 - (content_vectors.embedding <=> query_embedding) as similarity
     from content_vectors
     where 1 - (content_vectors.embedding <=> query_embedding) > match_threshold
     order by similarity desc
     limit match_count;
   $$;
   ```

## Testing
- Use tools like Postman or cURL to test the endpoints.
- Example cURL command:
  ```bash
  curl -X POST http://localhost:3000/api/vector/generateEmbeddings \
       -H "Content-Type: text/plain" \
       -d "Your text here"
  ```

## License
This project is licensed under the MIT License.