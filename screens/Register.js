import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import basicUserApi from '../api/basicUserApi'

import AppTextInput from '../components/AppTextInput'
import AppButton from '../components/AppButton'

const RegisterScreen = ({ navigation }) => {
  const [isLoading, setLoading] = React.useState(false)
  const [newUser, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SET_EMAIL':
          return { ...prevState, email: action.email }
        case 'SET_PASSWORD':
          return { ...prevState, password: action.password }
        case 'SET_FIRST_NAME':
          return { ...prevState, first_name: action.first_name }
        case 'SET_LAST_NAME':
          return { ...prevState, last_name: action.last_name }
      }
    },
    {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    }
  )
  
  const register = async (userDetails) => {
    try {
      const res = await basicUserApi.register(userDetails)
      const result = await res.json()

      if (res.status > 400) {
        Alert.alert('Oops', result, [{ text: 'OK' }])
      } else {
        Alert.alert('Success', `User ${userDetails.email} has been created. An activation email has been sent.`, [{ text: 'OK' }])
        navigation.navigate('Login')
      }
    } catch (e) {
      Alert.alert(e.name, e.message, [{ text: 'OK' }])
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    await register(newUser)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <AppTextInput
        onChangeText={email => dispatch({ type: 'SET_EMAIL', email })}
        value={newUser.email}
        placeholder='email'
        textContentType='emailAddress'
        keyboardType='email-address'
        disabled={isLoading}
      />
      <AppTextInput
        onChangeText={password => dispatch({ type: 'SET_PASSWORD', password })}
        placeholder='password'
        value={newUser.password}
        textContentType='password'
        secureTextEntry={true}
        disabled={isLoading}
      />
      <AppTextInput
        onChangeText={first_name => dispatch({ type: 'SET_FIRST_NAME', first_name })}
        placeholder='first name'
        value={newUser.first_name}
        textContentType='givenName'
        keyboardType='default'
        disabled={isLoading}
      />
      <AppTextInput
        onChangeText={last_name => dispatch({ type: 'SET_LAST_NAME', last_name })}
        placeholder='last name'
        value={newUser.last_name}
        textContentType='familyName'
        keyboardType='default'
        disabled={isLoading}
      />
      <View style={styles.controls}>
        <AppButton title="Cancel" onPress={() => navigation.navigate('Login')} color='gray' />
        <AppButton title="Register" onPress={handleRegister} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
})

export default RegisterScreen
