import React from 'react'
import { Alert, View, Text, FlatList, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import basicUserApi from '../api/basicUserApi'

const UserItem = ({ user: { item: { email, first_name, last_name }}}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.header}>Email</Text>
      <Text style={styles.content}>{email}</Text>
      <Text style={styles.header}>First name</Text>
      <Text style={styles.content}>{first_name}</Text>
      <Text style={styles.header}>Last name</Text>
      <Text style={styles.content}>{last_name}</Text>
    </View>
  )
}

const ListScreen = ({ navigation }) => {
  const [usersList, setUsersList] = React.useState([])

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const res = await basicUserApi.users(accessToken)
        const result = await res.json()

        if (res.status >= 400) {
          Alert.alert('Oops', result.error, [{ text: 'OK' }])
        } else {
          console.log(result)
          setUsersList(result.users)
        }
      } catch (e) {
        Alert.alert(e.name, e.message, [{ text: 'OK' }])
      }
    }

    fetchUsers()
  }, [])

  return (
    <View>
      <FlatList
        data={usersList}
        renderItem={(user) => <UserItem user={user} />}
        keyExtractor={user => user.email}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 12,
    color: 'gray'
  },
  content: {
    fontSize: 16,
    paddingBottom: 10,
  }
});

export default ListScreen
