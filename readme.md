# SOCIAL MEDIA FEEDS

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Licence](#licence)

## Project Overview
This is a demo MEAN stack application designed for managing social media feeds. Users can create, read, update feeds. The application has a clean user interface built with Angular and RESTful API powered by Express and MongoDB.

## Technologies Used
- **MongoDB**: NoSQL database for storing feeds data.
- **Express**: Web framework for Node.js to handle HTTP requests.
- **Angular**: Frontend framework for building the user interface.
- **Node.js**: Javascript runtime for javascript code.
- **Winston**: Logging library for tracking application events.

## Installation

### Prerequisites
- Node.js (version 20.18.0 or later)
- MongoDB (version 7.0.15 or later)
- Angular CLI (version 18.2.8 or later)

### Clone the Repository
```bash
git clone https://github.com/akashdeep-singh-multani/social_media_feeds.git
cd social_media_feeds
```

### Install Backend Dependencies
cd backend
npm install

### Install Frontend Dependencies
cd frontend
npm install

## Backend Setup
1. Configuration: Create a .env file in the backend directory and add the following variables:

MONGO_URI=mongodb+srv://akashdeepm:IPug2Jd8h1J3DA9O@cluster0.vhelk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8080
IP=192.168.1.6
JWT_SECRET=79d47fa1111e0dcbc21ff4b443af8c334046f5fd727e504f21df63cd2c972f08
SERVER_ORIGIN_URL=["http://localhost:4200", "http://localhost:53455"]

2. Start the Server
cd backend
npm start

3. The backend server should be running at http://localhost:8080

## Frontend Setup
1. Start the Frontend
cd frontend
ng serve

2. The frontend application should be running at http://localhost:4200

## Usage
Navigate to http://localhost:4200 in your browser to access the application. You can view, edit feeds.

## API Endpoints
Here are the main API endpoints available in the backend:

Authentication:
1. POST http://192.168.1.6:8080/api/signup: Registers a new user.
2. POST http://192.168.1.6:8080/api/login: Logs in a user.

Feed Operations
1. GET http://192.168.1.6:8080/api/comments/load/:postId: Retrieves all the comments based on a postId.
2. POST http://192.168.1.6:8080/api/comments/create: Creates a new comment.
   Parameters: userId
3. POST http://192.168.1.6:8080/api/like/posts/:postId/likes

## Contributing
Contributons are welcome! Please follow these steps to contribute:
1. Fork the repository
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Open a pull request detailing your changes.

## Licence
This project is licensed under the MIT Licence.