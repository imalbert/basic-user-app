import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

const AppButton = (props) => (
  <View style={styles.button}>
    <Button {...props} />
  </View>
)

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 5,
  }
})

export default AppButton