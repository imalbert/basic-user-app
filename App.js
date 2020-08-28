import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import React, { useReducer } from 'react'
import { StyleSheet, Alert, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  LoginScreen,
  RegisterScreen,
  MainScreen,
} from './screens'

export const AuthContext = React.createContext()

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

  const authContext = React.useMemo(
    () => ({
      login: async (loginDetails) => {
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginDetails)
        }

        try {
          const res = await fetch(`http://192.168.1.158:18999/auth/login`, options)
          const result = await res.json()

          if (res.status === 401) {
            Alert.alert('Oops', result, [{ text: 'OK' }])
          } else {
            const accessToken = res.url.split(`users?token=`)[1]
            await AsyncStorage.setItem('accessToken', accessToken)
            dispatch({ type: 'LOGIN', accessToken });
          }
        } catch (e) {
          Alert.alert(e.name, e.message, [{ text: 'OK' }])
        }
      },
      logout: async () => {
        try {
          await AsyncStorage.removeItem('accessToken')
          dispatch({ type: 'LOGOUT' })
        } catch (e) {
          Alert.alert(e.name, e.message, [{ text: 'OK' }])
        }
      },
    }),
    []
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

  return (
    <AuthContext.Provider value={authContext}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <NavigationContainer>
          <Stack.Navigator>
          {!state.accessToken ? (
            <>
            <Stack.Screen name="Login" component={() => <LoginScreen isLoading={state.isLoading} />}/>
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
