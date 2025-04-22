import { createContext } from "react";
import { HubConnection } from "@microsoft/signalr";

const SignalRContext = createContext<HubConnection | null>(null);

export default SignalRContext;
