import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  LoginScreen,
  RegisterScreen,
  MainScreen,
} from './screens'

const Stack = createStackNavigator()

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator>
        {loggedIn ? (
          <>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          </>
        ) : (
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Constants.statusBarHeight,
  },
})
