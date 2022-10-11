## React Native Apollo Devtools

### Installation

#### Setting up mobile app

1. Add this in the package.json of the react-native app as devDependencies

```
    "react-native-apollo-devtools": "https://github.com/mohit23x/react-native-apollo-devtools.git#4efe5b63ef5911b66fed6144259b94292cdd6d2b",
    "react-native-flipper": "^0.131.1",
```

2. In the root file for example `index.ts` , add these lines, here the `client` is our apollo client exported from `apolloConfig.native.ts` file 

```
import { apolloDevToolsInit } from 'react-native-apollo-devtools/packages/react-native-apollo-devtools-client';

if(__DEV__){
    apolloDevToolsInit(client, {});
}

```


#### Setting up Flipper Plugin

> NOTE: These steps are temporary workaround until we move this repo to org and publish this plugin

1. Install Flipper in your system, and make sure the emulator/device is recognized by flipper by setting up proper SDK path

2. Go to `plugins manager` -> `install plugin` -> `import plugin` download [this plugin bundle](https://github.com/mohit23x/react-native-apollo-devtools/raw/master/packages/flipper-plugin-react-native-apollo-devtools/flipper-plugin-react-native-apollo-devtools-v1.0.0.tgz) and import it 

3. Click `install` and restart Flipper

![Untitled Diagram](https://user-images.githubusercontent.com/36567063/156292803-824e4b53-05e5-44ba-8f71-240e946cee27.jpg)

4. Launch the mobile app and you should see `Apollo Devtools` in the list of plugin in disable section, Click `+` icon to enable it 🎉

![image](https://user-images.githubusercontent.com/36567063/153851206-33074526-329c-4b82-87c7-18c59d963649.png)

