import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeGarage from './HomeGarage'
import OrderHistoryBengkel from './OrderHistoryBengkel'
import ProfileBengkel from './ProfileBengkel'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainGarage() {
  return (
    <Tab.Navigator initialRouteName="Home Garage"  tabBarOptions={{ activeTintColor: '#DB3022', inactiveTintColor: 'gray'}}>
      <Tab.Screen
        name="Home Garage"
        component={HomeGarage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Order History Bengkel"
        component={OrderHistoryBengkel}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile Bengkel"
        component={ProfileBengkel}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
