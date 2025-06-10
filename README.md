# Guess the Number Game

A simple web-based "Guess the Number" game where players try to guess a randomly selected number between 1 and 100. The game tracks the number of attempts and features a leaderboard of top players.

## Features

- Guess a random number between 1 and 100
- Tracks number of attempts per game
- Leaderboard showing top players with fewest attempts
- User authentication (login/register)
- Backend API built with Node.js and Express
- Frontend built with React
- Scores stored in a database (MongoDB)

## Tech Stack

- Frontend: React, Axios
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)
- Authentication: JWT-based

## Deployed link
Click:- https://guess-the-number-game123.netlify.app/

## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance running locally or via cloud (MongoDB Atlas)

### Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    - Create a `.env` file in the `backend` directory with the following content:

      ```
      PORT=8080
      MONGODB_URI=mongodb://localhost:27017/guess-game
      JWT_SECRET=your_jwt_secret_here
      ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend app:

    ```bash
    npm start
    ```

4. Visit the app in your browser at https://guess-the-number-game123.netlify.app/

## API Endpoints

### Game Routes

- `POST /api/game/guess` → submit a guess
- `POST /api/game/reset-game` → reset the game (generate new number)
- `GET /api/game/leaderboard` → fetch leaderboard

### Auth Routes

- `POST /api/auth/register` → register a new user
- `POST /api/auth/login` → log in a user

## Notes

- The target number is currently stored in server memory and is global to all users. In a production version, this should be improved to store a target number per user or per session.



