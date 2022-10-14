## 🚀 React Native Apollo Devtools

[Flipper](https://github.com/facebook/flipper) plugin to debug [apollo client](https://github.com/apollographql/apollo-client) cache, queries and mutations for React Native.

The [official apollo client devtool](https://github.com/apollographql/apollo-client-devtools) does not supports React Native and only works for web, so this plugin provides complete feature parity with the official apollo devtool for React Native.

#### 📱 Setting up mobile app

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


#### 🖥️ Setting up Flipper

1. Install [Flipper](https://fbflipper.com/) in your machine, and make sure the emulator/device is recognized by flipper by setting up proper SDK path in flipper settings.

2. Go to `plugins manager` -> `install plugin` -> search `react-native-apollo` and install the plugin named `react-native-apollo-devtools`

3. Restart Flipper

4. Launch the mobile app and you should see `Apollo Devtools` in the list of plugin in disable section, Click `+` icon to enable it 🎉


![Untitled-2022-10-11-1036](https://user-images.githubusercontent.com/36567063/195002113-bdb270c2-d03a-45fd-a112-e350963c082b.png)
