import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SignalRProvider from "./provider/SignalRProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SignalRProvider>
      <App />
    </SignalRProvider>
  </React.StrictMode>
);
