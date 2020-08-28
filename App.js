import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import React from 'react'
import { StyleSheet, Alert, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  LoginScreen,
  RegisterScreen,
  MainScreen,
} from './screens'
import { AuthContext, authUtils } from './context/auth'

const Stack = createStackNavigator()
export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOGIN':
          return {
            ...prevState,
            isLoggedOut: false,
            accessToken: action.accessToken,
          }
        case 'LOGOUT':
          return {
            ...prevState,
            isLoggedOut: true,
            accessToken: null,
          }
        case 'SET_TOKEN':
          return {
            ...prevState,
            accessToken: action.accessToken,
            isLoading: false,
          }
      }
    },
    {
      isLoading: true,
      isLoggedOut: false,
      accessToken: null,
    }
  )

  React.useEffect(() => {
    const getLocalAccessToken = async () => {
      let accessToken
      try {
        accessToken = await AsyncStorage.getItem('accessToken')
      } catch (e) {
        Alert.alert(e.name, e.message, [{ text: 'OK' }])
      }
      dispatch({ type: 'SET_TOKEN', accessToken });
    }

    getLocalAccessToken()
  }, [])

  const authContext = React.useMemo(authUtils(dispatch), [])

  return (
    <AuthContext.Provider value={authContext}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <NavigationContainer>
          <Stack.Navigator>
          {!state.accessToken ? (
            <>
            <Stack.Screen name="Login">
              {() => <LoginScreen isLoading={state.isLoading} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            </>
          ) : (
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Constants.statusBarHeight,
  },
})
