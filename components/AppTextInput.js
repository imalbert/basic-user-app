import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const AppTextInput = (props) => <TextInput style={styles.textInput} {...props} />

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  }
})

export default AppTextInput