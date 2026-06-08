# Architecture Document

## 1. Tech Stack

### Frontend
- **Web**: React 18.2.0
- **Mobile**: React Native 0.71.0
- **State Management**: Redux 4.2.0
- **Styling**: Styled-components 5.3.3
- **Maps**: Leaflet 1.9.4

### Backend
- **Server**: Node.js 18.17.0
- **Framework**: Express.js 4.18.2
- **AI Integration**: Python 3.10 with FastAPI 0.85.0
- **Data Processing**: Pandas 1.5.3, Ollama AI

### Database
- **Primary**: PostgreSQL 14
- **Caching**: Redis 7.0

### Hosting & Deployment
- **Frontend Hosting**: Vercel
- **Backend Hosting**: AWS Elastic Beanstalk
- **Database Hosting**: AWS RDS for PostgreSQL
- **CI/CD**: GitHub Actions

## 2. Project Structure

```plaintext
/military-activity-app
|-- /frontend
|   |-- /src
|   |   |-- /components
|   |   |-- /pages
|   |   |-- /redux
|   |   |-- /styles
|   |   |-- App.js
|   |   |-- index.js
|-- /mobile
|   |-- /src
|   |   |-- /components
|   |   |-- /screens
|   |   |-- /redux
|   |   |-- /styles
|   |   |-- App.js
|-- /backend
|   |-- /src
|   |   |-- /controllers
|   |   |-- /models
|   |   |-- /routes
|   |   |-- /services
|   |   |-- app.js
|-- /ai-service
|   |-- /src
|   |   |-- /models
|   |   |-- /routes
|   |   |-- main.py
|-- /scripts
|-- package.json
|-- README.md
```

## 3. API Design

### Backend API Endpoints

- **GET /api/reports**
  - **Description**: Fetch categorized military reports.
  - **Response**: 
    ```json
    [
      {
        "id": "string",
        "title": "string",
        "category": "string",
        "location": "GeoJSON",
        "timestamp": "ISO8601",
        "content": "string"
      }
    ]
    ```

- **POST /api/report**
  - **Description**: Submit a new military report.
  - **Request**:
    ```json
    {
      "title": "string",
      "category": "string",
      "location": "GeoJSON",
      "content": "string"
    }
    ```
  - **Response**: 
    ```json
    {
      "id": "string",
      "status": "string"
    }
    ```

- **GET /api/predictions**
  - **Description**: Fetch AI-generated predictions.
  - **Response**:
    ```json
    {
      "region": "string",
      "timeframe": "string",
      "prediction": "string",
      "confidence": "float"
    }
    ```

### AI Service Endpoints

- **POST /ai/generate-report**
  - **Description**: Generate a report using Ollama AI.
  - **Request**:
    ```json
    {
      "dataSources": ["string"],
      "parameters": {
        "region": "string",
        "timeframe": "string"
      }
    }
    ```
  - **Response**:
    ```json
    {
      "report": "string",
      "details": {
        "summary": "string",
        "sources": ["string"]
      }
    }
    ```

## 4. Data Models

### PostgreSQL Schemas

#### Reports
```sql
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(50),
    location GEOGRAPHY(Point, 4326),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT
);
```

#### Predictions
```sql
CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    region VARCHAR(255),
    timeframe VARCHAR(50),
    prediction TEXT,
    confidence FLOAT
);
```

## 5. Authentication

### Approach
- **JWT (JSON Web Tokens)**: Secure token-based authentication.
- **Flow**:
  1. User logs in with credentials.
  2. Server validates credentials and issues a JWT.
  3. JWT is stored in the client-side (HTTP-only cookie or local storage).
  4. Subsequent requests include the JWT in the Authorization header.

## 6. State Management

### Strategy
- **Redux**: Centralized state management.
- **Middleware**: Redux Thunk for async operations.
- **Structure**:
  - **Actions**: Define action types and creators.
  - **Reducers**: Update state based on actions.
  - **Selectors**: Extract and compute derived state.

## 7. Key Dependencies

- **Frontend**:
  - `react`: Core library for building the UI.
  - `react-native`: Framework for building mobile apps.
  - `redux`: State management library.
  - `styled-components`: CSS-in-JS for styling.
  - `leaflet`: Interactive maps.

- **Backend**:
  - `express`: Web framework for node.js.
  - `jsonwebtoken`: JWT implementation for authentication.
  - `pg`: PostgreSQL client for Node.js.
  - `redis`: Redis client for caching.

- **AI Service**:
  - `fastapi`: High-performance web framework for building APIs with Python.
  - `pandas`: Data manipulation and analysis.
  - `ollama-ai`: Local AI model integration.

## 8. Deployment

### Hosting Recommendations
- **Frontend**: Deploy on Vercel for seamless integration with React and fast global delivery.
- **Backend**: Use AWS Elastic Beanstalk for scalable infrastructure and easy deployment.
- **Database**: AWS RDS for managed PostgreSQL databases with high availability.

### CI/CD Approach
- **GitHub Actions**: Automate testing and deployment workflows.
  - **Steps**:
    1. Code pushed to GitHub triggers build and test workflows.
    2. Successful builds are automatically deployed to staging environments.
    3. On approval, deploy to production environments.

This architecture ensures a robust, scalable, and maintainable solution for the military activity reporting and prediction web application.