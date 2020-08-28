import React from 'react'
import { View, Text, Button } from 'react-native'

import { AuthContext } from '../App'

const UserScreen = ({ navigation }) => {
  const { logout } = React.useContext(AuthContext)

  return (
    <View>
      <Button
        onPress={() => logout()}
        title="logout"
      />
      <Button
        onPress={() => navigation.navigate('ChangePassword')}
        title="Change password"
      />
    </View>
  )
}

export default UserScreen