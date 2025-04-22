import React, { useState, useEffect, useRef } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
} from "@microsoft/signalr";
import SignalRContext from "../context/SignalRContext";
import SignalRProviderProps from "../types/SignalRProviderProps";

const SignalRProvider: React.FC<SignalRProviderProps> = ({ children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5198/itempriceshub", {
        transport: HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR");
        hasStarted.current = true;
        setConnection(newConnection);
      })
      .catch((err) => {
        console.error("SignalR connection failed: ", err);
        hasStarted.current = false;
      });

    return () => {
      if (hasStarted.current) {
        newConnection
          .stop()
          .then(() => console.log("SignalR connection stopped."))
          .catch((err) => console.error("Error stopping SignalR: ", err));
      }
    };
  }, []);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};

export default SignalRProvider;
