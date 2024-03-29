import * as signalR from "@microsoft/signalr";
import { getStreamingSocket } from "./events/index.js";
export * from "./events/index.js";

export interface IStreamingClient {
  events: (handleEvent, streams) => signalR.HubConnection;
}

export const streamingClient = (
  apiKey: string,
  apiBaseURL?: string,
): IStreamingClient => ({
  events: (handleEvent, streams) => getStreamingSocket(apiKey, apiBaseURL, streams, handleEvent),
});

export default streamingClient;
