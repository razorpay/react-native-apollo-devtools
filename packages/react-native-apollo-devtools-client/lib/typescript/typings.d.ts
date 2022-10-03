import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
export declare type ApolloClientType = ApolloClient<NormalizedCacheObject>;
export interface Query {
    id: number;
    name: string | null;
    variables: Record<string, any> | undefined;
}
export declare type QueryData = Query & {
    queryString: string;
    cachedData: object;
};
export declare type MutationData = {
    id: string;
    name: string | null;
    variables: object;
    loading: boolean;
    error: object;
    body: string | undefined;
};
export declare type Callback = () => any;
export declare type ArrayOfQuery = Array<QueryData | undefined>;
export declare type ArrayOfMutations = Array<MutationData>;
export declare type ApolloClientState = {
    id: number;
    lastUpdateAt: string;
    queries: ArrayOfQuery;
    mutations: ArrayOfMutations;
    cache: object;
};
