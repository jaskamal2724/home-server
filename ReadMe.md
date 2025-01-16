# Real-Time Room State Management

This project is a **Node.js** server using **Express** and **Socket.IO** to manage and synchronize the state of lights across rooms (bedroom and kitchen) in real-time. It is designed to work with a frontend client hosted on `http://localhost:5173`.

---

## Features
- Real-time state synchronization of room lights using WebSockets.
- Handles multiple connected clients, ensuring all clients see the updated state.
- Lightweight backend setup with `Express` and `Socket.IO`.
- Easy-to-configure CORS setup for frontend integration.
- Server automatically broadcasts updates to all connected clients.

---

## Prerequisites

Before you proceed, make sure you have the following installed:

1. **Node.js** (v14 or higher)
2. **npm** (comes with Node.js)
3. A frontend client (e.g., a React/Vite app) hosted at `http://localhost:5173`.

---

## Getting Started

### 1. Set Up Project Structure
Create a folder for your project and inside it, create two subfolders: one for the backend and another for the frontend.
```bash
mkdir RealTimeRoomState
cd RealTimeRoomState
mkdir server client
```

### 2. Clone the Repository
Clone the backend repository into the `server` folder and your frontend repository into the `client` folder:
```bash
cd server
git clone <backend-repository-url> .
cd ../client
git clone <frontend-repository-url> .
```

### 3. Install Dependencies
#### Backend:
Navigate to the `server` folder and run:
```bash
cd ../server
npm install
```
This command installs all required backend packages, including:
- `express`
- `socket.io`
- `cors`

#### Frontend:
Navigate to the `client` folder and run:
```bash
cd ../client
npm install
```
This will install frontend dependencies, such as React or Vite.

### 4. Configure the Backend Server (Optional)
By default, the backend server listens on port `3001`. To change the port, set the `PORT` environment variable:

#### Option 1: Update in the code
Edit this line in `index.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

#### Option 2: Use environment variables
Create a `.env` file in the `server` folder and add:
```env
PORT=your_custom_port
```

### 5. Start the Backend Server
Run the following command in the `server` folder:
```bash
npm start
```
This will start the backend server and log:
```plaintext
Server running on port 3001
```

### 6. Start the Frontend Server
Navigate to the `client` folder and start the frontend server:
```bash
npm run dev
```
By default, the frontend runs on `http://localhost:5173`.

---

## API and WebSocket Setup

### WebSocket Connection
The server listens for WebSocket connections from the client. It communicates on the following events:

1. **`initialState` (Server -> Client):**
   - Sent to new clients when they connect, containing the initial state of all rooms.

2. **`roomUpdate` (Client -> Server):**
   - Sent by clients to update the state of a room.

3. **`roomUpdate` (Server -> All Clients):**
   - Broadcasts the updated state to all connected clients.

### Example Room State
```json
{
  "bedroom": {
    "light1": false,
    "light2": false
  },
  "kitchen": {
    "light1": false,
    "light2": false
  }
}
```

---

## Folder Structure
```plaintext
RealTimeRoomState
├── server
│   ├── index.js         # Main backend server file
│   ├── package.json     # Backend project metadata and dependencies
│   ├── package-lock.json
│   ├── .env             # Optional environment variables file
│   └── README.md        # Backend documentation
└── client
    ├── src              # Frontend source files
    ├── package.json     # Frontend project metadata and dependencies
    ├── package-lock.json
    └── README.md        # Frontend documentation
```

---

## Frontend Setup
Ensure the frontend is hosted at `http://localhost:5173`. You can change the `origin` in the `cors` and `Socket.IO` configuration if the frontend is hosted elsewhere:

### Update in `index.js`
```javascript
const io = new Server(server, {
  cors: {
    origin: "<your-frontend-url>",
    methods: ["GET", "POST"]
  }
});
```

### Example Frontend Integration
To connect the frontend client to this WebSocket server, use the following example code:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("initialState", (state) => {
  console.log("Initial State:", state);
});

socket.on("roomUpdate", (updatedState) => {
  console.log("Updated State:", updatedState);
});

// Example to send room updates
socket.emit("roomUpdate", {
  bedroom: {
    light1: true,
    light2: false
  },
  kitchen: {
    light1: true,
    light2: true
  }
});
```

---

## Troubleshooting

### Common Issues
1. **CORS Errors:**
   - Make sure the frontend URL matches the `origin` setting in both `cors` and `Socket.IO` configuration.

2. **Server Port Conflicts:**
   - If port `3001` is already in use, change the port in the code or use an environment variable.

3. **Client Not Receiving Updates:**
   - Verify that the client is correctly connected to the WebSocket server.
   - Check the browser console for WebSocket errors.

4. **Frontend and Backend Out of Sync:**
   - Ensure both frontend and backend use the same WebSocket events (`initialState`, `roomUpdate`).

### Debugging Tips
- Use `console.log` to track events and data in the server.
- Use browser developer tools to monitor WebSocket connections.
- Test WebSocket connections using tools like [Postman](https://www.postman.com/) or [WebSocket Debugger](https://www.websocket.org/echo.html).

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

## Contributions
Feel free to open issues or submit pull requests to enhance this project. Collaboration is welcome!
