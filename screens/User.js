import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AuthContext } from '../context/auth'
import AppButton from '../components/AppButton'

const UserScreen = ({ navigation }) => {
  const { logout } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <AppButton onPress={() => logout()} title="logout" />
      <AppButton onPress={() => navigation.navigate('ChangePassword')} title="Change password" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
})

export default UserScreen