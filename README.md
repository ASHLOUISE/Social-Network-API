# Social-Network-Api

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Video Demo](#video-demo)
- [Links](#links)
- [License](#license)

### Overview
This is a backend API for a social network application. It allows users to perform various actions such as creating accounts, adding friends, creating thoughts, reacting to thoughts, and more.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

### Setup
- Clone the repository to your local machine.
- Install dependencies.
- Set up your MongoDB database either locally or through a service like MongoDB Atlas.
- Start the server: `npm start`

### API Endpoints
## Users
- GET /api/users: Get all users.
- GET /api/users/:id: Get a single user by ID.
- POST /api/users: Create a new user.
- PUT /api/users/:id: Update a user by ID.
- DELETE /api/users/:id: Delete a user by ID.
## Thoughts
- GET /api/thoughts: Get all thoughts.
- GET /api/thoughts/:id: Get a single thought by ID.
- POST /api/thoughts: Create a new thought.
- PUT /api/thoughts/:id: Update a thought by ID.
- DELETE /api/thoughts/:id: Delete a thought by ID.
## Reactions
- POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought.
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought.
## Friends
- POST /api/users/:id/friends/:friendId: Add a friend to a user's friend list.
- DELETE /api/users/:id/friends/:friendId: Remove a friend from a user's friend list.

### Usage
- Use an API development tool like Postman or Insomnia to interact with the API endpoints.
- Send requests to the appropriate endpoints with the required parameters and data in the request body.
- Handle responses from the server to perform desired actions or display data.

### Video Demo
https://drive.google.com/file/d/1It3iM7CPAHY8sCRE8USUkZXOJeyq1nLb/view

https://drive.google.com/file/d/16W76RWsBrnCX33JMXUBWpy_n7gm_dvvC/view


### Links
GitHub:https://github.com/ASHLOUISE/Social-Network-API

### License 
MIT license used.
