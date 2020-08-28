import React from 'react'
import { View, Text, Button } from 'react-native'

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Register screen</Text>
      <Button title="Cancel" onPress={() => { navigation.navigate('Login') }} />
    </View>
  )
}

export default RegisterScreen
