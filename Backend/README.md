# LectureQ Backend (Node.js + Express + MongoDB)

A backend for a mobile-first app that gives every student a safe, anonymous mic in large lectures, and provides instructors a real-time confusion heatmap.

## Quick Start

1. **Clone & install**
```bash
cd backend
npm install
cp .env.example .env
# Fill .env → MONGO_URI, JWT_SECRET, PORT
```

2. **Run locally**
```bash
npm run dev
# server on http://localhost:4000
```

3. **Health check**
```bash
curl http://localhost:4000/health
```

## Environment Variables

| Key | Example | Description |
| --- | --- | --- |
| PORT | 4000 | Port to run the server |
| NODE_ENV | development | Node environment |
| MONGO_URI | mongodb+srv://... | MongoDB connection string |
| JWT_SECRET | longsecret | For auth tokens (future) |

## Data Models (Mongoose)

- **User**: name, email, role (`student`/`instructor`), createdAt
- **Course**: code, title, instructor (ref User), term, createdAt
- **Question**: course (ref Course), author (nullable ref User), text, anonymous (bool), status (`open`/`addressed`/`dismissed`), upvotes (number), createdAt, updatedAt

## API (CRUD)

Base URL: `/api`

### Users
- `GET /api/users` — list users
- `POST /api/users` — create
- `GET /api/users/:id` — get by id
- `PUT /api/users/:id` — update by id
- `DELETE /api/users/:id` — delete by id

### Courses
- `GET /api/courses`
- `POST /api/courses`
- `GET /api/courses/:id`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`

### Questions
- `GET /api/questions?courseId=<id>` — filter by course
- `POST /api/questions` — create (anonymous supported)
- `GET /api/questions/:id`
- `PUT /api/questions/:id` — update (e.g., status, text)
- `DELETE /api/questions/:id`

### Rooms (sample module)
- `GET /api/rooms`
- `POST /api/rooms`
- `GET /api/rooms/:id`
- `PUT /api/rooms/:id`
- `DELETE /api/rooms/:id`

### Health
- `GET /health`

See `Deliverable5.postman_collection.json` for ready-made calls.

## Testing

```bash
npm test
```

This runs a sample Supertest for `/health`.

## Project Structure

```
backend/
  controllers/
  models/
  routes/
  tests/
  server.js
  .env.example
  package.json
  README.md
  Deliverable5.postman_collection.json
```
