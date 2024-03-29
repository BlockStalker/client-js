import * as signalR from "@microsoft/signalr";
import { IBlockEvent } from "../types/index.js";

export const getSignalRClient = (url: string, apiKey: string, streams: string[], handleEvent: (event: IBlockEvent) => void): signalR.HubConnection => {
    if (!apiKey) {
        throw new Error("API Key not provided.");
    }

    async function subscribeToStreams(connection: signalR.HubConnection, streams: string[], apiKey: string): Promise<void> {
        if (streams.length === 0) {
            console.warn('No streams to subscribe to.');
            return;
        }
        await Promise.all(streams.map(async (stream) => {
            console.log(`Subscribing to ${stream}`);
            await connection.invoke("Subscribe", { stream: stream, apiKey: apiKey }).catch(err => console.error(err.toString()));
        }));
    }

    const OneHourReconnect = (function () {
        function ForeverReconnectPolicy() { }
        ForeverReconnectPolicy.prototype.nextRetryDelayInMilliseconds = function (retryContext) {
            return retryContext.elapsedMilliseconds < 60000 * 60 ? 3000 : null;
        };
        return ForeverReconnectPolicy;
    }());
    
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .withAutomaticReconnect(new OneHourReconnect())
        .build();

    connection.on("event", (event : IBlockEvent) => {
        try {
            handleEvent(event);
        } catch (error) {
            console.error('Error parsing or handling event:', error);
        }
    });

    connection.onreconnected(() => {
        console.log('Reconnected');
        subscribeToStreams(connection, streams, apiKey);
    });

    connection.start().then(() => {
        console.log('Connected');
        subscribeToStreams(connection, streams, apiKey);
    });

    return connection;
};