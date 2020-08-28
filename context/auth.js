import React from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export const AuthContext = React.createContext()
export const authUtils = (dispatch) => () => ({
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
})