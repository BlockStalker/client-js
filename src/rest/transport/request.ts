import fetchModule from './fetch.js';
import { stringify } from 'query-string';
//import stringify from 'query-string';

export interface IBlockStalkerQuery {
  [key: string]: string | number | boolean | undefined;
}

export type IHeaders = HeadersInit

export interface IRequestInit extends Omit<RequestInit, 'headers'> {
  headers?: IHeaders
}

export interface IGlobalOptions extends IRequestInit {
  trace?: boolean;
}

export type IRequestOptions = IGlobalOptions;

export interface IBlockStalkerQueryWithCredentials extends IBlockStalkerQuery {
  apiKey: string | boolean;
}

export type IGet = (path: string, query: IBlockStalkerQuery, options: IRequestOptions) => Promise<any>;
export type IPost = (path: string, body: any, options: IRequestOptions) => Promise<any>;
export type ICurriedGet = (apiKey: string, apiBase: string, globalOptions?: IGlobalOptions) => IGet;
export type ICurriedPost = (apiKey: string, apiBase: string, globalOptions?: IGlobalOptions) => IPost;
export type IStructuredError = InstanceType<typeof StructuredError>;

class StructuredError extends Error {
  constructor(errors: string[]) {
    super("Errors: " + errors.join('; '));
  }
}

export const getWithGlobals: ICurriedGet = (apiKey, apiBase, globalOptions = {}): IGet =>
  async (path, query = {}, options = {}): Promise<any> => {
    if(!apiKey) {
      throw new Error("API KEY not configured...");
    }

    const fetchPage = async (path, query = {}, options: IRequestOptions = {}): Promise<any> => {
      const queryString = stringify(query, {
        encode: true
      });
      const url = `${apiBase}${path}${queryString ? '?' + queryString : ''}`;
      const headers = {
        ...(options.headers || globalOptions.headers || {}),
        "X-API-Key": `${apiKey}`
      }

      if(globalOptions.trace) {
        console.log("Request URL: ", url);
        const printHeaders = {
          ...headers
        };

        if('X-API-Key' in printHeaders) {
          printHeaders['X-API-Key'] = printHeaders['X-API-Key'].replace(apiKey, 'REDACTED');
        }

        console.log("Request Headers: ", printHeaders);
      }

      try {
        const response = await fetchModule.fetch(url, {
          ...globalOptions,
          ...options,
          headers: headers
        });

        if(globalOptions.trace) {
          console.log("Response Headers: ", response.headers);
        }

        if(response.status >= 400) {
          const rawMessage = await response.text();
          let error;
          try {
            const json = JSON.parse(rawMessage);
            error = new StructuredError(json.errors);
          } catch (e) {
            error = new Error(rawMessage);
          }
          throw error;
        }

        const json = await response.json();
        if (json.success) {
          return json.data;
        }
        else {
          throw new StructuredError(json.errors);
        }

      } catch (e) {
        throw e;
      }
    };

    return fetchPage(path, query, options);
  };

export const postWithGlobals: ICurriedPost = (apiKey, apiBase, globalOptions = {}): IPost =>
  async (path, body = {}, options = {}): Promise<any> => {
     if (!apiKey) {
       throw new Error("API KEY not configured...");
     }
 
     const fetchPage = async (path, body = {}, options: IRequestOptions = {}): Promise<any> => {
       const url = `${apiBase}${path}`;
       const headers = {
         ...(options.headers || globalOptions.headers || {}),
         "X-API-Key": `${apiKey}`,
         "Content-Type": "application/json"
       };
 
       if (globalOptions.trace) {
         console.log("Request URL: ", url);
         const printHeaders = {
           ...headers
         };
 
         if ('X-API-Key' in printHeaders) {
           printHeaders['X-API-Key'] = printHeaders['X-API-Key'].replace(apiKey, 'REDACTED');
         }
 
         console.log("Request Headers: ", printHeaders);
         console.log("Request Body: ", body);
       }
 
       try {
         const response = await fetchModule.fetch(url, {
           ...globalOptions,
           ...options,
           method: 'POST',
           headers: headers,
           body: JSON.stringify(body)
         });
 
         if (globalOptions.trace) {
           console.log("Response Headers: ", response.headers);
         }
 
         if (response.status >= 400) {
           const rawMessage = await response.text();
           let error;
           try {
             const json = JSON.parse(rawMessage);
             error = new StructuredError(json.errors);
           } catch (e) {
             error = new Error(rawMessage);
           }
           throw error;
         }
 
         const json = await response.json();
         if (json.success) {
           return json.data;
         } else {
           throw new StructuredError(json.errors);
         }
 
       } catch (e) {
         throw e;
       }
     };
 
     return fetchPage(path, body, options);
  };