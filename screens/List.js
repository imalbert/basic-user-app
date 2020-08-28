import React from 'react'
import { Alert, View, Text, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import basicUserApi from '../api/basicUserApi'

const UserItem = ({ user: { item: { email, first_name, last_name }}}) => {
  return (
    <View>
      <Text>{email}</Text>
      <Text>{first_name}</Text>
      <Text>{last_name}</Text>
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
      <Text>email</Text>
      <FlatList
        data={usersList}
        renderItem={(user) => <UserItem user={user} />}
        keyExtractor={user => user.email}
      />
    </View>
  )
}

export default ListScreen
