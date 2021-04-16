import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import store from "./store/";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from './screens/Home'
import SignUp from './screens/SignUp'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ 
            title: '', 
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#DB3022',
            },
          }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: '', headerTitleAlign: 'center' }} />
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
