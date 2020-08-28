### Setup

##### 0. Start [basic-user-api](https://github.com/imalbert/basic-user-api) and change the `./api/basicUserApi.js` file to where the API is running
```
const BASIC_USER_API = `http://192.168.1.158:18999`
```

##### 1. Install expo-cli

```
yarn add expo-cli global
```

##### 2. Install dependencies

```
yarn install
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-native-community/async-storage
```

##### 3. Run expo's Metro Bundler
This packages the JS part of your react-native app and more.

But what's important right now is that this will open a webpage that contains a QR code you will need for the next step.

```
yarn start
```

##### 4. (Recommended) Install Expo app on your Phone (Android/iOS)

Scan the QR code from the previous step using the Expo app on your phone. The Expo app will download the JS bundle from the Metro Bundle and opens the application within it.
