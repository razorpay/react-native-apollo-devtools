/* eslint-disable @typescript-eslint/no-unused-vars */
import { getOperationName } from '@apollo/client/utilities';
import { getQueries, getQueryData } from './flipperUtils';
let counter = 0;

function getTime() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
}

function extractQueries(client) {
  // @ts-expect-error queryManager is private method
  if (!client || !client.queryManager) {
    return new Map();
  } // @ts-expect-error queryManager is private method


  return client.queryManager.queries;
}

function getAllQueries(client) {
  // console.log("==========")
  // console.log("queries: ", client.queryManager.queries);
  // console.log("==========")
  const queryMap = extractQueries(client);
  const allQueries = getQueries(queryMap);
  return allQueries === null || allQueries === void 0 ? void 0 : allQueries.map(getQueryData);
}

function getMutationData(allMutations) {
  var _ref;

  return (_ref = [...Object.keys(allMutations)]) === null || _ref === void 0 ? void 0 : _ref.map(key => {
    var _mutation$loc, _mutation$loc$source;

    const {
      mutation,
      variables,
      loading,
      error
    } = allMutations[key]; // console.log({ key });
    // console.log(JSON.stringify(allMutations[key]));

    return {
      id: key,
      name: getOperationName(mutation),
      variables,
      loading,
      error,
      body: mutation === null || mutation === void 0 ? void 0 : (_mutation$loc = mutation.loc) === null || _mutation$loc === void 0 ? void 0 : (_mutation$loc$source = _mutation$loc.source) === null || _mutation$loc$source === void 0 ? void 0 : _mutation$loc$source.body
    };
  });
}

function getAllMutations(client) {
  // @ts-expect-error private method
  const allMutations = client.queryManager.mutationStore || {};
  const final = getMutationData(allMutations);
  return final;
}

function getCurrentState(client) {
  counter++;
  return {
    id: counter,
    lastUpdateAt: getTime(),
    queries: getAllQueries(client),
    mutations: getAllMutations(client),
    cache: client.cache.extract(true)
  };
}

export const initializeFlipperUtils = (flipperConnection, apolloClient) => {
  let acknowledged = true;
  let enqueue = getCurrentState(apolloClient);

  function sendData() {
    if (enqueue) {
      flipperConnection.send('GQL:response', enqueue);
      acknowledged = false;
      enqueue = null;
    }
  }

  const logger = () => {
    enqueue = getCurrentState(apolloClient);

    if (acknowledged) {
      sendData();
    }
  };

  flipperConnection.receive('GQL:ack', () => {
    acknowledged = true;
    sendData();
  });
  flipperConnection.receive('GQL:request', () => {
    flipperConnection.send('GQL:response', getCurrentState(apolloClient));
  });
  flipperConnection.send('GQL:response', enqueue);

  apolloClient.__actionHookForDevTools(logger);
};
//# sourceMappingURL=initializeFlipperUtils.js.map