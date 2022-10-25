# 🚀 React Native Apollo Devtools

<img src="https://img.shields.io/npm/dm/react-native-apollo-devtools-client?label=npm&style=flat-square" />


[Flipper](https://github.com/facebook/flipper) plugin to visualise [apollo client](https://github.com/apollographql/apollo-client) cache, queries and mutations for React Native.

This plugin offers feature parity with the official devtool for React Native since the [official apollo client devtool](https://github.com/apollographql/apollo-client-devtools) only supports web platform and does not supports React Native.

<img width="1172" alt="image" src="https://user-images.githubusercontent.com/36567063/196852057-71418605-a873-4523-b059-7b3364b35d86.png">

###### *Devtools in action with the Ricky and Morty GraphQL API based react native [sample app](https://github.com/HarrisonHenri/rick-morty-react-native-shop)*

<br />

## 📱 Setting up mobile app

1. Install dependecies
        
```
yarn add -D react-native-apollo-devtools-client

yarn add -D react-native-flipper
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

## 🖥️ Setting up Flipper

1. Install [Flipper](https://fbflipper.com/) in your machine, and make sure the emulator/device is recognized by flipper by setting up proper SDK path in flipper settings.

2. Go to `plugins manager` -> `install plugin` -> search `react-native-apollo` and install the plugin named `react-native-apollo-devtools`

3. Restart Flipper

4. Launch the mobile app and you should see `Apollo Devtools` in the list of plugin in disable section, Click `+` icon to enable it 🎉


![Untitled-2022-10-11-1036](https://user-images.githubusercontent.com/36567063/195002113-bdb270c2-d03a-45fd-a112-e350963c082b.png)

## ⭐ Stargazers

[![Stargazers repo roster for @razorpay/react-native-apollo-devtools](https://reporoster.com/stars/razorpay/react-native-apollo-devtools)](https://github.com/razorpay/react-native-apollo-devtools/stargazers)

## 📝 License

Licensed under the [MIT License](./LICENSE.md).

Link to our [Code of Conduct](https://github.com/razorpay/.github/blob/master/CODE_OF_CONDUCT.md)
