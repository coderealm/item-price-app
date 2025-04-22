# Item Price Updates App

A React Web App.

## Tech Stack

- Frontend: React, TypeScript, HTML, CSS, Vite
- Styling: Vanilla CSS

### Backend

- Real-time price updates via WebSocket using ASP.NET Core SignalR backend
- Price change indicators (up/down/same)
- Subscribe/Unsubscribe toggle
- Minimal network traffic to UI using ASP.NET Core SignalR to push price changes to the client
- The ASP.NET Core app uses a background service every second to randomly generate item prices
- The items are pushed to subscribed clients

## Frontend

The frontend is built with React and TypeScript using Vite for fast development and build times. It connects to the backend via SignalR WebSocket and:

- Subscribes to real-time price updates
- Displays a list of items and their current prices
- Visually indicates price changes (up, down, or no change)
- Allows the user to subscribe or unsubscribe from updates
- Updates the UI in sync with backend-generated data every second

To start frontend:  
`bash`
cd item-price-app

npm install && npm run dev
