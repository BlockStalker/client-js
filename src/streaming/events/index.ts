import * as signalR from "@microsoft/signalr";
import { getSignalRClient } from "../transport/index.js";
import { IBlockEvent } from "../types/index.js";
import { API_BASE, REALTIME_BASE } from "../../common/index.js";

export const getStreamingSocket = (
    apiKey: string,
    apiBaseURL: string = API_BASE,
    streams: string[],
    handleEvent: (event: IBlockEvent) => void,
): signalR.HubConnection => getSignalRClient(`${apiBaseURL}${REALTIME_BASE}`, apiKey, streams, handleEvent);