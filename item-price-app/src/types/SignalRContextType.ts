import { HubConnection } from "@microsoft/signalr";

interface SignalRContextType {
  connection: HubConnection | null;
}

export default SignalRContextType;
