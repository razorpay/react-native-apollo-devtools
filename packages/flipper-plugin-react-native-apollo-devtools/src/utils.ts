import { BlockType } from './typings'
import { ArrayOfMutations, ArrayOfQuery } from "react-native-apollo-devtools-client/src/typings";


function createQueryBlocks(queries: ArrayOfQuery) {
    return queries.map((query) => {
        return {
            id: query?.id,
            name: query?.name,
            operationType: "Query",
            blocks: [
                // {
                //   blockType: "GQLString",
                //   blockLabel: "Query String",
                //   blockValue: query.queryString,
                // },
                {
                    blockType: "Object",
                    blockLabel: "Query Variables",
                    blockValue: query?.variables,
                },
                {
                    blockType: "Object",
                    blockLabel: "Cached Query Data",
                    blockValue: query?.cachedData,
                },
            ],
        };
    });
}

function createCacheBlock(cacheObject: object) {
    return [...Object.keys(cacheObject || {})].map((c) => {
        // @ts-expect-error
        const cache = cacheObject[c];

        return {
            id: cache?.id || cache.__typename,
            name: c,
            operationType: "Cache",
            blocks: [
                {
                    blockType: "Object",
                    blockLabel: "Cached Data",
                    blockValue: cache,
                },
            ],
        };
    });
}

function createMutationBlocks(mutations: ArrayOfMutations): BlockType[] {
    return mutations.map((mutation) => {
        // TODO: cached response (options not applicable in apollo 3.5+)
        return {
            id: mutation?.id,
            name: mutation.name,
            operationType: "Mutation",
            blocks: [
                {
                    blockType: "GQLString",
                    blockLabel: "Mutation Query String",
                    blockValue: mutation.body,
                },
                {
                    blockType: "Object",
                    blockLabel: "Query Variables",
                    blockValue: mutation.variables,
                },
            ],
        };
    });
}


export { createCacheBlock, createMutationBlocks, createQueryBlocks }