import { IGet, IRequestOptions, getWithGlobals } from "../transport/request.js";
import registryClient, { IRegistryClient } from "./registry.js";
import filtersClient, { IFiltersClient } from "./filters.js";
import { IStreamsClient, streamsClient } from "./streams.js";

export interface IRestClient {
    registry: IRegistryClient;
    streams: IStreamsClient;
    filters: IFiltersClient;
}

export const restClient = (
    apiKey: string,
    apiBaseURL: string = "https://api.blockstalker.io/",
    options?: IRequestOptions
) : IRestClient => ({
    registry: registryClient(apiKey, apiBaseURL, options),
    streams: streamsClient(apiKey, apiBaseURL, options),
    filters: filtersClient(apiKey, apiBaseURL, options),
});

export default restClient;