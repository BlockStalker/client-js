import { API_BASE, V1_JSON_BASE } from "../../common/index.js";
import { IGet, IPost, IRequestOptions, getWithGlobals, postWithGlobals } from "../transport/request.js";
import { IFilterForm, IFiltersList, IFiltersResponse } from "./types.js";

export interface IFiltersClient {
    getByStream: (streamId: string, options?: IRequestOptions) => Promise<IFiltersList>;
    create: (filter: IFilterForm, options?: IRequestOptions) => Promise<IFiltersResponse>;
    delete: (filterId: number, options?: IRequestOptions) => Promise<IFiltersResponse>;
    enable: (filterId: number, options?: IRequestOptions) => Promise<IFiltersResponse>;
    disable: (filterId: number, options?: IRequestOptions) => Promise<IFiltersResponse>;
}

const getFilters = async (
    get: IGet,
    streamId: string,
    options?: IRequestOptions
): Promise<any> => get(`${V1_JSON_BASE}/filters/${streamId}`, {}, options);

const createFilter = async (
    post: IPost,
    filter: IFilterForm,
    options?: IRequestOptions
): Promise<any> => {
    if ('filterForm' in filter) throw new Error('Ensure you are calling .build() when using FilterFormBuilder.');
    return post(`${V1_JSON_BASE}/filters`, filter, options);
}

const deleteFilter = async (
    post: IPost,
    filterId: number,
    options?: IRequestOptions
): Promise<any> => post(`${V1_JSON_BASE}/filters`, { action: "delete", id : filterId }, options);

const enableDisableFilter = async (
    post: IPost,
    filterId: number,
    enable: boolean,
    options?: IRequestOptions
): Promise<any> => post(`${V1_JSON_BASE}/filters`, { action: enable ? "enable" : "disable", id : filterId }, options);

export const filtersClient = (
    apiKey: string,
    apiBaseURL: string = API_BASE,
    options?: IRequestOptions
): IFiltersClient => {
    const post = postWithGlobals(apiKey, apiBaseURL, options);
    const get = getWithGlobals(apiKey, apiBaseURL, options);
    return ({
        getByStream: (streamId: string, ...args) => getFilters(get, streamId, ...args),
        create: (filter: IFilterForm, ...args) => createFilter(post, filter, ...args),
        delete: (filterId: number, ...args) => deleteFilter(post, filterId, ...args),
        enable: (filterId: number, ...args) => enableDisableFilter(post, filterId, true, ...args),
        disable: (filterId: number, ...args) => enableDisableFilter(post, filterId, false, ...args),
    });
}

export default filtersClient;