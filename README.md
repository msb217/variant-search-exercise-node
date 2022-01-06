## Setup and run the project locally

### Prerequisites
- This application requires Node.js and npm to be installed locally. To setup node.js and npm pick the LTS version or higher from https://nodejs.org/en/.
- Verify whether `node -v` and `npm -v` work in your terminal

### Build and launch the application
In a terminal window:
- First cd to the top project directory. The server code is in the `backend` directory and the client is in the `frontend` directory.
- cd into the backend folder. Perform `npm install` to install dependencies needed to run the server locally
- Start the backend server using `npm start`
- In another terminal, cd into the frontend folder. Perform `npm install` to install dependencies needed to run the frontend locally
- Start the frontend using `npm start`

### Verify the application is running
- The server should be running on http://localhost:8000/
- The client should be running on http://localhost:3000/. Enter the URL in the browser to verify that the UI is loading without errors. The gene data should be displayed on the table on the UI.

