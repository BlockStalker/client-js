import { API_BASE, V1_JSON_BASE } from "../../common/index.js";
import { IGet, IPost, IRequestOptions, getWithGlobals, postWithGlobals } from "../transport/request.js";
import { IStreamUpdateOptions, IStreamsInfo, IStreamsResponse } from "./types.js";

export interface IStreamsClient {
    owned: (options?: IRequestOptions) => Promise<IStreamsInfo>;
    create: (options?: IRequestOptions) => Promise<IStreamsResponse>;
    delete: (streamId: string, options?: IRequestOptions) => Promise<IStreamsResponse>;
    update: (streamConfig: IStreamUpdateOptions, options?: IRequestOptions) => Promise<IStreamsResponse>;
}

const ownedStreams = async (
    get: IGet,
    options?: IRequestOptions
): Promise<any> => get(`${V1_JSON_BASE}/streams`, {}, options);

const createStream = async (
    post: IPost,
    options?: IRequestOptions
): Promise<any> => post(`${V1_JSON_BASE}/streams`, { action: "create" }, options);

const deleteStream = async (
    post: IPost,
    streamId: string,
    options?: IRequestOptions
): Promise<any> => post(`${V1_JSON_BASE}/streams`, { action: "delete", id : streamId }, options);

const updateStream = async (
    post: IPost,
    streamConfig: IStreamUpdateOptions,
    options?: IRequestOptions
): Promise<any> => post(`${V1_JSON_BASE}/streams`, { action: "update", ...streamConfig }, options);

export const streamsClient = (
    apiKey: string,
    apiBaseURL: string = API_BASE,
    options?: IRequestOptions
): IStreamsClient => {
    const post = postWithGlobals(apiKey, apiBaseURL, options);
    const get = getWithGlobals(apiKey, apiBaseURL, options);
    return ({
        owned: (...args) => ownedStreams(get, ...args),
        create: (...args) => createStream(post, ...args),
        delete: (streamId: string, ...args) => deleteStream(post, streamId, ...args),
        update: (streamConfig: IStreamUpdateOptions, ...args) => updateStream(post, streamConfig, ...args),
    });
}

export default streamsClient;