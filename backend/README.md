# Backend Example - Express.js & Mongoose

A RESTful API backend built with Express.js and Mongoose for managing messages with full CRUD operations.

## Features

- ✅ Complete CRUD operations for messages
- ✅ Standardized JSON response format
- ✅ MongoDB integration with Mongoose
- ✅ Error handling middleware
- ✅ Environment configuration
- ✅ Postman/Thunder Client collection for testing
- ✅ Controller-based architecture

## Project Structure

```
Backend Example/
├── controllers/
│   └── messageController.js    # Business logic for message operations
├── models/
│   └── Message.js             # Mongoose schema for messages
├── routes/
│   └── messageRoutes.js       # API route definitions
├── tests/
│   ├── Deliverable5.postman_collection.json
│   └── README.md              # Testing instructions
├── .env                       # Environment variables
├── package.json              # Dependencies and scripts
└── server.js                 # Main server file
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Make sure MongoDB is running locally, or update the `.env` file with your MongoDB connection string.

### 3. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

All responses follow the standardized format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

### Message Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rooms` | Create a new room |
| GET | `/api/rooms` | Get all rooms |
| GET | `/api/rooms/:id` | Get a specific room by ID |
| PUT | `/api/rooms/:id` | Update a room by ID |
| DELETE | `/api/rooms/:id` | Delete a room by ID |

### Message Schema

```json
{
  "creator": "string (required, max 100 chars)",
  "name": "string (required, max 100 chars)",
}
```

## Testing

### Option 1: Postman
1. Import the collection: `tests/Deliverable5.postman_collection.json`
2. Test each endpoint with the provided sample data

### Option 2: Thunder Client (VS Code)
1. Install Thunder Client extension
2. Follow the instructions in `tests/README.md`

### Option 3: cURL Examples

**Create a room:**
```bash
curl -X POST http://localhost:3000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "creator": "John Doe",
    "name": "CSC 101"
  }'
```

**Get all rooms:**
```bash
curl http://localhost:3000/api/rooms
```

**Get room by ID:**
```bash
curl http://localhost:3000/api/rooms/:roomId
```

**Update a message:**
```bash
curl -X PUT http://localhost:3000/api/rooms/:roomId \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Jane Done",
    "text": "CSC 102"
  }'
```

**Delete a room:**
```bash
curl -X DELETE http://localhost:3000/api/rooms/:roomId
```

## Environment Variables

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/backend-example
```

For production, replace `MONGODB_URI` with your actual MongoDB connection string.

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **nodemon**: Development auto-restart (dev dependency)