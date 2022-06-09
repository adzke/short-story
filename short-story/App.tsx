import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, } from 'react-native';
import { getStories } from './common/storiesAPIFunctions';
import { HomeScreen } from './components/home';
import { Loading } from './components/loading';


export type ShortStoryNavigatorPamarList = {
  ['Home']: undefined
}


const Stack = createNativeStackNavigator<ShortStoryNavigatorPamarList>();


export default function App() {

  useEffect(() => {
    getStories()
  }, []);
  
  return (
    <NavigationContainer>
      <Loading />
      <Stack.Navigator initialRouteName='Home' screenOptions={{

      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
