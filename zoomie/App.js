import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import store from "./store/";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from './screens/Home'
import Main from './screens/Main'
import WelcomePage from './screens/WelcomePage'
import SignupUser from './screens/SignupUser'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Welcome Page"
            component={WelcomePage}
            options={{ 
              title: '', 
              headerTitleAlign: 'center',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#DB3022',
                elevation: 0
              },
            }}
          />
          <Stack.Screen
            name="Signup User"
            component={SignupUser}
            options={{
              title: '',
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: '',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#F2F2F2',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
