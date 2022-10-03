/* eslint-disable consistent-return */
import { getOperationName } from '@apollo/client/utilities';
import { print } from 'graphql';
let done = true;
export function getQueryData(query, key) {
  if (!query || !query.document) return; // TODO: The current designs do not account for non-cached data.
  // We need a workaround to show that data + we should surface
  // the FetchPolicy.

  const name = getOperationName(query === null || query === void 0 ? void 0 : query.document);

  if (name === 'IntrospectionQuery') {
    return;
  }

  if (done) {
    done = false;
    return;
  }

  return {
    id: key,
    name,
    queryString: print(query.document),
    variables: query.variables,
    // @ts-expect-error
    cachedData: query.cachedData
  };
}
export function getQueries(queryMap) {
  let queries = [];

  if (queryMap) {
    // @ts-expect-error todo
    queries = [...queryMap.values()].map(_ref => {
      var _document$loc;

      let {
        document,
        variables,
        diff
      } = _ref;
      return {
        document,
        source: document === null || document === void 0 ? void 0 : (_document$loc = document.loc) === null || _document$loc === void 0 ? void 0 : _document$loc.source,
        variables,
        cachedData: diff === null || diff === void 0 ? void 0 : diff.result
      };
    });
  }

  return queries;
}
//# sourceMappingURL=flipperUtils.js.map