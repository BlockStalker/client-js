import { API_BASE, V1_JSON_BASE } from "../../common/index.js";
import { IGet, IRequestOptions, getWithGlobals } from "../transport/request.js";
import { IRegistryResult } from "./types.js";

export interface IRegistryClient {
    lookup: (key: string, options?: IRequestOptions) => Promise<IRegistryResult>;
    lookupKeyId: (id: number, options?: IRequestOptions) => Promise<IRegistryResult>;
}

const lookup = async (
    get: IGet,
    mode: string,
    query: string | number,
    options?: IRequestOptions
): Promise<any> => get(`${V1_JSON_BASE}/lookup/${mode}/${query}`, {}, options);

export const registryClient = (
    apiKey: string,
    apiBaseURL: string = API_BASE,
    options?: IRequestOptions
): IRegistryClient => {
    const get = getWithGlobals(apiKey, apiBaseURL, options);
    return ({
        lookup: (key: string, ...args) => lookup(get, 'key', key, ...args),
        lookupKeyId: (id: number, ...args) => lookup(get, 'id', id, ...args),
    });
}

export default registryClient;