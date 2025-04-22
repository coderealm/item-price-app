import { useContext } from "react";
import { HubConnection } from "@microsoft/signalr";
import SignalRContext from "../context/SignalRContext";

const UseSignalR = (): HubConnection | null => {
  const connection = useContext(SignalRContext);
  return connection;
};

export default UseSignalR;
