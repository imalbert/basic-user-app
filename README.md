### Installation

##### Install expo-cli

```
yarn add expo-cli global
```

##### react-navigation

- Stack.Navigator
  - If not logged in:
    - Login (Screen)
    - Register (Screen)
  - If logged in:
    - Root (Stack.Navigator)
      - Main (Tab.Navigator)
        - List
        - User 
      - Change password (Modal)

```
yarn install

expo install \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-screens \
  react-native-safe-area-context \
  react-native-community/masked-view \
  @react-native-community/async-storage
```

```
@react-navigation/native
@react-navigation/stack
@react-navigation/tabs
```

### Run

```
yarn start
```
