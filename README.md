# TODO App - Full Stack Application

A modern TODO application built with React (frontend), Express (backend), and PostgreSQL (database).

## Features

- 🔐 User Authentication (Register & Login with JWT)
- ✅ Create, Read, Update, Delete TODOs
- 📅 Due Dates for TODOs
- ⚡ Priority Levels (High, Medium, Low)
- 🎨 Responsive UI
- 💾 Persistent Storage with PostgreSQL

## Tech Stack

- **Frontend**: React with Hooks, Axios
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT + bcryptjs

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation & Setup

### 1. Database Setup

First, create a PostgreSQL database:

```bash
# Create the database
createdb todo_app

# Connect to the database
psql -U postgres -d todo_app

# Run the schema file to create tables
\i /path/to/backend/schema.sql
```

Or import the schema directly:

```bash
psql -U postgres -d todo_app -f backend/schema.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (already created with default values)
# Update DATABASE_URL if needed in .env file

# Start the server
npm run dev  # Development mode with nodemon
# OR
npm start    # Production mode
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### TODOs

- `GET /api/todos` - Get all TODOs for logged-in user
- `GET /api/todos/:id` - Get a specific TODO
- `POST /api/todos` - Create a new TODO
- `PUT /api/todos/:id` - Update a TODO
- `DELETE /api/todos/:id` - Delete a TODO

## Environment Variables

### Backend (.env)

```
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/todo_app
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

## Project Structure

```
.
├── backend/
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   └── todos.js        # TODO routes
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── db.js               # PostgreSQL connection
│   ├── schema.sql          # Database schema
│   ├── server.js           # Express server entry point
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js     # Login/Register component
    │   │   ├── TodoForm.js  # Create TODO form
    │   │   ├── TodoList.js  # Display TODOs
    │   │   └── *.css        # Component styles
    │   ├── api.js           # API client
    │   ├── AuthContext.js   # Auth context provider
    │   ├── App.js           # Main app component
    │   ├── index.css        # Global styles
    │   └── index.js
    └── package.json
```

## Usage

1. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Server** (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```

3. **Access the App**:
   - Open `http://localhost:3000` in your browser
   - Register a new account or login
   - Create, view, edit, and delete TODOs

## Features Walkthrough

### Registration & Login

- Click "Register" to create a new account
- JWT token is automatically stored in localStorage
- Token is sent with every API request via Authorization header

### Managing TODOs

- **Create**: Fill in the form and click "Create TODO"
- **View**: All your TODOs are displayed as cards
- **Complete**: Check the checkbox to mark a TODO as done
- **Delete**: Click the ✕ button to remove a TODO
- **Filter**: TODOs can have priorities (High, Medium, Low) and due dates

## Error Handling

- Authentication errors are displayed with clear messages
- API errors are caught and shown to the user
- Form validation prevents empty submissions

## Development

### Running Tests

Currently, no tests are configured. You can add Jest for unit tests:

```bash
npm install --save-dev jest @testing-library/react
```

### Troubleshooting

**Database Connection Error**:
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env` matches your setup
- Check database credentials

**CORS Errors**:
- Backend CORS is configured for development
- Modify if frontend URL changes

**Token Expired**:
- Tokens expire after 24 hours
- User needs to login again

## Deployment

### Frontend Deployment (Vercel, Netlify)

```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend Deployment (Heroku, Railway, etc.)

1. Update `DATABASE_URL` to production database
2. Change `JWT_SECRET` to a secure value
3. Set `NODE_ENV=production`
4. Deploy using your hosting provider's CLI

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
# Todo-App
# Todo-App
