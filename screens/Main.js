import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ListScreen from './List'
import UserScreen from './User'
import ChangePasswordScreen from './ChangePassword'

const Tab = createBottomTabNavigator()
const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  )
}

const RootMainStack = createStackNavigator()
const RootMainScreen = () => {
  return (
    <RootMainStack.Navigator mode="modal">
      <RootMainStack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <RootMainStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </RootMainStack.Navigator>
  );
}

export default RootMainScreen
