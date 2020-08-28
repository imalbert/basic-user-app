import React from 'react'
import { View, Text, Button } from 'react-native'

const UserScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('ChangePassword')}
        title="Change password"
      />
    </View>
  )
}

export default UserScreen