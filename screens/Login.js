import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { AuthContext } from '../context/auth'

const LoginScreen = ({ navigation, isLoading }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { login } = React.useContext(AuthContext)

  return (
    <View>
      <Text>Basic login</Text>
      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        textContentType='emailAddress'
        keyboardType='email-address'
        disabled={isLoading}
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        textContentType='password'
        secureTextEntry={true}
        disabled={isLoading}
      />
      <Button
        title="Login"
        onPress={() => { login({ email, password }) }}
        disabled={isLoading}
      />
      <Button
        title="Register"
        styles={{ backgroundColor: 'transparent' }}
        onPress={() => {
          navigation.navigate('Register')
        }}
        disabled={isLoading}
      />
    </View>
  )
}

export default LoginScreen
