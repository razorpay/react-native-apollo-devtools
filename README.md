# 🚀 React Native Apollo Devtools

[<img src="https://img.shields.io/npm/dm/react-native-apollo-devtools-client?label=npm&style=flat-square" />](https://www.npmjs.com/package/react-native-apollo-devtools-client)


This plugin offers feature parity with the official devtool for React Native since the [official apollo client devtool](https://github.com/apollographql/apollo-client-devtools) only supports web platform and does not supports React Native.

## 📱 Setting up mobile app

1. Install dependency
        
```
yarn add -D react-native-apollo-devtools-client
```

2. Initialize the plugin with apollo client

```
import { apolloDevToolsInit } from 'react-native-apollo-devtools-client';

const client = new ApolloClient({
    // ...
})

if(__DEV__){
    apolloDevToolsInit(client);
}

```

## ⭐ Stargazers

[![Stargazers repo roster for @razorpay/react-native-apollo-devtools](https://reporoster.com/stars/razorpay/react-native-apollo-devtools)](https://github.com/razorpay/react-native-apollo-devtools/stargazers)

## 📝 License

Licensed under the [MIT License](./LICENSE.md).

Link to our [Code of Conduct](https://github.com/razorpay/.github/blob/master/CODE_OF_CONDUCT.md)
