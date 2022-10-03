"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueries = getQueries;
exports.getQueryData = getQueryData;

var _utilities = require("@apollo/client/utilities");

var _graphql = require("graphql");

/* eslint-disable consistent-return */
let done = true;

function getQueryData(query, key) {
  if (!query || !query.document) return; // TODO: The current designs do not account for non-cached data.
  // We need a workaround to show that data + we should surface
  // the FetchPolicy.

  const name = (0, _utilities.getOperationName)(query === null || query === void 0 ? void 0 : query.document);

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
    queryString: (0, _graphql.print)(query.document),
    variables: query.variables,
    // @ts-expect-error
    cachedData: query.cachedData
  };
}

function getQueries(queryMap) {
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