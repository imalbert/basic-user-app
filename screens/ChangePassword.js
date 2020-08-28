import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import basicUserApi from '../api/basicUserApi'
import { AuthContext } from '../context/auth'

import AppTextInput from '../components/AppTextInput'
import AppButton from '../components/AppButton'

const ChangePasswordScreen = ({ navigation }) => {
  const { logout } = React.useContext(AuthContext)
  const [isLoading, setLoading] = React.useState(false)
  const [passwords, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SET_OLDPW':
          return { ...prevState, oldpw: action.oldpw }
        case 'SET_NEWPW':
          return { ...prevState, newpw: action.newpw }
        case 'SET_AGAIN':
          return { ...prevState, again: action.again }
      }
    },
    {
      oldpw: '',
      newpw: '',
      again: '',
    }
  )

  const changePassword = async (passwordDetails) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      const res = await basicUserApi.changePassword(passwordDetails, accessToken)

      if (res.status >= 400) {
        const result = await res.json()
        Alert.alert('Oops', result.error, [{ text: 'OK' }])
      } else {
        Alert.alert('Success', `Password has been changed.`, [{ text: 'OK' }])
        logout()
      }
    } catch (e) {
      Alert.alert(e.name, e.message, [{ text: 'OK' }])
    }
  }

  const handleChangePassword = async () => {
    setLoading(true)
    await changePassword(passwords)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <AppTextInput
        onChangeText={text => dispatch({ type: 'SET_OLDPW', oldpw: text })}
        placeholder='old password'
        value={passwords.oldpw}
        textContentType='password'
        secureTextEntry={true}
        disabled={isLoading}
      />
      <AppTextInput
        onChangeText={text => dispatch({ type: 'SET_NEWPW', newpw: text })}
        placeholder='new password'
        value={passwords.newpw}
        textContentType='password'
        secureTextEntry={true}
        disabled={isLoading}
      />
      <AppTextInput
        onChangeText={text => dispatch({ type: 'SET_AGAIN', again: text })}
        placeholder='repeat new password'
        value={passwords.again}
        textContentType='password'
        secureTextEntry={true}
        disabled={isLoading}
      />
      <View style={styles.controls}>
        <AppButton color='gray' onPress={() => navigation.goBack()} title="Cancel" />
        <AppButton onPress={handleChangePassword} title="Change password" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
})

export default ChangePasswordScreen
