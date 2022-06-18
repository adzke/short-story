import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, View, } from 'react-native';
import { getStories } from './common/storiesAPIFunctions';
import { HomeScreen } from './components/home';
import { Loading } from './components/loading';
import { ReadStories } from './components/read-story';
import { Stories } from './components/stories';
import { useFonts } from 'expo-font';
import { HeaderRight } from './common/header-right';
import { AddStory } from './components/add-story';
import { HeaderLeft } from './common/header-left';
import { HeaderCustom } from './common/header-custom';
import { Header } from '@react-navigation/stack';
import { AlertBanner } from './common/alert-banner';

export type ShortStoryNavigatorPamarList = {
  ['Home']: undefined
  ['ReadStories']: undefined
  ['Stories']: undefined
  ['AddStory']: undefined
}


const Stack = createNativeStackNavigator<ShortStoryNavigatorPamarList>();


export default function App() {


  useEffect(() => {
    getStories()
  }, []);

  const fontLoaded = useFonts({
    Caveat: require('./assets/fonts/LibreBaskerville-Regular.ttf'),
    LibreBaskerville: require('./assets/fonts/LibreBaskerville-Regular.ttf'),
    DancingScript: require('./assets/fonts/DancingScript-Regular.ttf'),
  });

  if (!fontLoaded) {
    return null;
  }

  return (

    <NavigationContainer >
      <AlertBanner />
      <Loading />
      <Stack.Navigator initialRouteName='Stories' screenOptions={{
        header: (props) => <HeaderCustom {...props} />,
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


