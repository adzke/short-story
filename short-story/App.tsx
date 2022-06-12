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
import { useFonts } from 'expo-font';
import { HeaderRight } from './common/headerRight';
import { useReactiveVar } from '@apollo/client';
import { rvCurrentStory } from './common/common-states';
import { AddStory } from './components/add-story';

export type ShortStoryNavigatorPamarList = {
  ['Home']: undefined
  ['ReadStories']: undefined
  ['Stories']: undefined
  ['AddStory']: undefined
}


const Stack = createNativeStackNavigator<ShortStoryNavigatorPamarList>();


export default function App() {
  
  const story = useReactiveVar(rvCurrentStory)

  useEffect(() => {
    getStories()
  }, []);

   const fontLoaded = useFonts({
    Caveat: require('./assets/fonts/LibreBaskerville-Regular.ttf'),
    LibreBaskerville: require('./assets/fonts/LibreBaskerville-Regular.ttf'),
  });
  
  if (!fontLoaded) {
    return null;
  }
  
  return (
    <NavigationContainer >
      <Loading />
      <Stack.Navigator initialRouteName='Stories' screenOptions={{
        headerRight: HeaderRight,
        title: story ? story.title : "Pamphleteer",
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="ReadStories" component={ReadStories} />
        <Stack.Screen name="AddStory" component={AddStory} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});


