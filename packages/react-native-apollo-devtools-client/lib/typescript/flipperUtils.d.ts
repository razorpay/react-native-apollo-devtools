import type { QueryInfo } from '@apollo/client/core/QueryInfo';
import type { QueryData } from './typings';
export declare function getQueryData(query: QueryInfo, key: number): QueryData | undefined;
export declare function getQueries(queryMap: Map<any, any>): QueryInfo[];
