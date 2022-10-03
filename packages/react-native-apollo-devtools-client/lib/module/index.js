import { addPlugin } from 'react-native-flipper';
import { initializeFlipperUtils } from './initializeFlipperUtils';
export const apolloDevToolsInit = (client, _ref) => {
  let {
    onConnect
  } = _ref;
  return addPlugin({
    getId() {
      return 'react-native-apollo-devtools';
    },

    onConnect(connection) {
      initializeFlipperUtils(connection, client);
      if (onConnect) onConnect();
    },

    onDisconnect() {
      console.log('apollo:disconnected');
    }

  });
};
//# sourceMappingURL=index.js.map