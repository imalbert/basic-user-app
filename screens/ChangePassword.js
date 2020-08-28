import React from 'react'
import { View, Text, Button } from 'react-native'

const ChangePasswordScreen = ({ navigation }) => {
  return (
    <View>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

export default ChangePasswordScreen
