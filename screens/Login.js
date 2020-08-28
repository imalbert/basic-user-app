import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AuthContext } from '../context/auth'

import AppTextInput from '../components/AppTextInput'
import AppButton from '../components/AppButton'

const LoginScreen = ({ navigation, isLoading }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { login } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <AppTextInput
        onChangeText={text => setEmail(text)}
        placeholder='email'
        value={email}
        textContentType='emailAddress'
        keyboardType='email-address'
        disabled={isLoading}
      />
      <AppTextInput
        onChangeText={text => setPassword(text)}
        placeholder='password'
        value={password}
        textContentType='password'
        secureTextEntry={true}
        disabled={isLoading}
      />
      <View style={styles.controls}>
        <AppButton
          title="Register"
          onPress={() => {
            navigation.navigate('Register')
          }}
          disabled={isLoading}
        />
        <AppButton
          title="Login"
          onPress={() => { login({ email, password }) }}
          disabled={isLoading}
        />
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

export default LoginScreen
