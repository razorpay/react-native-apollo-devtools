import { addPlugin } from 'react-native-flipper';
import { initializeFlipperUtils } from './initializeFlipperUtils';
import type { ApolloClientType, Callback } from './typings';

export const apolloDevToolsInit = (
  client: ApolloClientType,
  config?: {
    onConnect?: Callback;
    onDisconnect?: Callback;
  }
): void =>
  addPlugin({
    getId() {
      return 'react-native-apollo-devtools';
    },
    onConnect(connection) {
      initializeFlipperUtils(connection, client);
      if (config?.onConnect) config?.onConnect();
    },
    onDisconnect() {
      if (config?.onDisconnect) config?.onDisconnect();
    },
  });
