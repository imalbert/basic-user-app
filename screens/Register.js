import React from 'react'
import { Alert, Button, Text, TextInput, View } from 'react-native'

import basicUserApi from '../api/basicUserApi'

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
    <View>
      <Text>Register screen</Text>
      <TextInput
        onChangeText={email => dispatch({ type: 'SET_EMAIL', email })}
        value={newUser.email}
        placeholder='email'
        textContentType='emailAddress'
        keyboardType='email-address'
        disabled={isLoading}
      />
      <TextInput
        onChangeText={password => dispatch({ type: 'SET_PASSWORD', password })}
        placeholder='password'
        value={newUser.password}
        textContentType='password'
        secureTextEntry={true}
        disabled={isLoading}
      />
      <TextInput
        onChangeText={first_name => dispatch({ type: 'SET_FIRST_NAME', first_name })}
        placeholder='first name'
        value={newUser.first_name}
        textContentType='givenName'
        keyboardType='default'
        disabled={isLoading}
      />
      <TextInput
        onChangeText={last_name => dispatch({ type: 'SET_LAST_NAME', last_name })}
        placeholder='last name'
        value={newUser.last_name}
        textContentType='familyName'
        keyboardType='default'
        disabled={isLoading}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Cancel" onPress={() => navigation.navigate('Login')} />
    </View>
  )
}

export default RegisterScreen
