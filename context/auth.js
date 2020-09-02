import React from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import basicUserApi from '../api/basicUserApi'

export const AuthContext = React.createContext()
export const authUtils = (dispatch) => () => ({
  login: async (loginDetails) => {
    try {
      const res = await basicUserApi.login(loginDetails)

      if (res.status === 401) {
        const result = await res.json()
        Alert.alert('Oops', result, [{ text: 'OK' }])
      } else {
        const accessToken = await res.text()
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