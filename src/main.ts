export * from "./rest/core/types.js";
export * from "./common/const.js";
export * from "./rest/core/index.js";
export * from "./streaming/index.js";

import { IRestClient, restClient } from "./rest/core/index.js";
import streamingClient, { IStreamingClient } from "./streaming/index.js";

export interface IBlockStalkerClient {
    rest: IRestClient;
    streaming: IStreamingClient;
}

export const blockStalkerClient = (
    apiKey: string,
    apiBaseURL?: string,
): IBlockStalkerClient => ({
    rest: restClient(apiKey, apiBaseURL),
    streaming: streamingClient(apiKey, apiBaseURL),
});

export default blockStalkerClient;