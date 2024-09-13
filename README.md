Poll System Application
This project is a Poll System Application that consists of multiple services, including Poll Service, Vote Service, and Result Service. It allows users to create polls, vote on them, and view the results. The project is built using Express.js for the backend and Svelte for the frontend. MongoDB is used as the database for storing poll data. The application also features logging with Winston and Morgan.

Table of Contents
About the Project
Technology Stack
Features
File Structure
Prerequisites
Setup
Running Services
API Endpoints
Logging
Future Improvements
License
About the Project
The Poll System Application enables users to:

Create new polls with a question and two answer options.
Vote on polls.
View live poll results.
Manage polls through separate services, with each service focusing on a specific part of the system (poll creation, voting, results).
This project is divided into four main parts:

Frontend (mypollproject): The Svelte-based user interface for managing and interacting with polls.
Poll Service (poll-service): Handles poll creation, retrieval, and deletion.
Vote Service (vote-service): Manages voting on polls.
Result Service (result-service): Retrieves the poll results.
Each service communicates with MongoDB and logs important events using Winston and Morgan.

Technology Stack
Frontend: Svelte
Backend: Express.js, MongoDB
Logging: Winston, Morgan
Database: MongoDB
Other: Docker (optional for deployment)
Features
Create new polls.
Vote on polls (answerA or answerB).
View poll results in real-time.
Log system events (poll creation, voting, result retrieval, etc.) with Winston and Morgan.


Prerequisites
Make sure to have the following installed on your system:

Node.js (v18 or above)
MongoDB (running locally or through MongoDB Atlas)
Docker (optional, for containerizing and deploying the services)
Setup
1. Clone the Repositorygit clone https://github.com/yourusername/poll-system-app.git
cd poll-system-app
2. Install Dependencies
Navigate to each service directory and install the required packages:# Poll Service
cd poll-service
npm install

# Vote Service
cd ../vote-service
npm install

# Result Service
cd ../result-service
npm install

# Frontend Svelte App
cd ../mypollproject
npm install
3. Start MongoDB
Ensure that MongoDB is running locally:mongod --dbpath /path/to/your/database
Alternatively, you can use MongoDB Atlas.

4. Running Services
Poll Servicecd poll-service
npm run start
Poll service will run on http://localhost:3001.

Vote Servicecd ../vote-service
npm run start
Vote service will run on http://localhost:3002.

Result Servicecd ../result-service
npm run start
Result service will run on http://localhost:3003.

Frontend (Svelte App)cd ../mypollproject
npm run dev
Frontend will be accessible at http://localhost:5000.

5. Docker Setup (Optional)
To run the services in Docker containers, use the following steps for each service:

Build Docker image:docker build -t service-name .
Run the container
docker run -p <host-port>:<container-port> service-name
API Endpoints
Poll Service (http://localhost:3001)
GET /polls - Retrieve all polls.
POST /polls - Create a new poll.
DELETE /polls/:id - Delete a poll by its ID.
Vote Service (http://localhost:3002)
POST /vote - Vote on a poll.
Body: { pollId: string, vote: 'a' | 'b' }
Result Service (http://localhost:3003)
GET /results - Retrieve the results of all polls.
Logging
Morgan: Logs HTTP requests.
Winston: Logs system events (info, error, etc.) to the console and log files (combined.log, error.log).
Future Improvements
Add user authentication.
Implement poll expiration dates.
Enhance the UI/UX.
Add support for multiple answer options (more than two).
