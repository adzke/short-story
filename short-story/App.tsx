import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Story } from './common/common-types';
import { getStories } from './common/storiesAPIFunctions';
import { HomeScreen } from './components/home';
import { Loading } from './components/loading';
import { ReadStories } from './components/read-story';
import { Stories } from './components/stories';


export type ShortStoryNavigatorPamarList = {
  ['Home']: undefined
  ['ReadStories']: undefined
  ['Stories']: undefined
}


const Stack = createNativeStackNavigator<ShortStoryNavigatorPamarList>();


export default function App() {

  useEffect(() => {
    getStories()
  }, []);

  const storyTheme = {
    ...DefaultTheme,
    
  };
  
  return (
    <NavigationContainer theme={storyTheme}>
      <Loading />
      <Stack.Navigator initialRouteName='Stories' screenOptions={{
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="ReadStories" component={ReadStories} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
