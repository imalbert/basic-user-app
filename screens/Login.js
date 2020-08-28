import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import { AuthContext } from '../App'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = React.useContext(AuthContext)

  return (
    <View>
      <Text>Basic login</Text>
      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        textContentType='emailAddress'
        keyboardType='email-address'
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        textContentType='password'
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => { login({ email, password }) }}
      />
      <Button
        title="Register"
        styles={{ backgroundColor: 'transparent' }}
        onPress={() => {
          navigation.navigate('Register')
        }}
      />
    </View>
  )
}

export default LoginScreen
