import * as React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Home from './screens/home';
import PlayList from './screens/playlist';
import {PlayListReducer} from './redux/reducers/playlist';

const Stack = createStackNavigator();
let store = createStore(PlayListReducer);

export default function stackContainer() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#00cec9" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: null }}
          />
          <Stack.Screen
            component={PlayList}
            name="PlayList"
            options={{ headerShown: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
