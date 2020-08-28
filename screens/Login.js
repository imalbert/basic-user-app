import React from 'react'
import { View, Text, Button } from 'react-native'

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Login screen</Text>
      <Button title="Register" onPress={() => { navigation.navigate('Register') }} />
    </View>
  )
}

export default LoginScreen
