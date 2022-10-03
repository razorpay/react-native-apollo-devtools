import { addPlugin } from 'react-native-flipper';
import { initializeFlipperUtils } from './initializeFlipperUtils';
import type { ApolloClientType, Callback } from './typings';

export const apolloDevToolsInit = (
  client: ApolloClientType,
  {
    onConnect,
  }: {
    onConnect?: Callback;
  }
): void =>
  addPlugin({
    getId() {
      return 'react-native-apollo-devtools';
    },
    onConnect(connection) {
      console.log('connection: ', connection);
      initializeFlipperUtils(connection, client);
      if (onConnect) onConnect();
    },
    onDisconnect() {
      console.log('apollo:disconnected');
    },
  });
