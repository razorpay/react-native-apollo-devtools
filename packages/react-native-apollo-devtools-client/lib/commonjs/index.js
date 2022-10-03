"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apolloDevToolsInit = void 0;

var _reactNativeFlipper = require("react-native-flipper");

var _initializeFlipperUtils = require("./initializeFlipperUtils");

const apolloDevToolsInit = (client, _ref) => {
  let {
    onConnect
  } = _ref;
  return (0, _reactNativeFlipper.addPlugin)({
    getId() {
      return 'react-native-apollo-devtools';
    },

    onConnect(connection) {
      (0, _initializeFlipperUtils.initializeFlipperUtils)(connection, client);
      if (onConnect) onConnect();
    },

    onDisconnect() {
      console.log('apollo:disconnected');
    }

  });
};

exports.apolloDevToolsInit = apolloDevToolsInit;
//# sourceMappingURL=index.js.map