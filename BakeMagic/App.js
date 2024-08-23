import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import RecipeScreen from './components/RecipeScreen'; // Import the new screen
import { useEffect } from 'react';
//import BootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

const App = () => {
  // useEffect(() => {
  //   const init = async () => {
  //     // No tasks to perform, so we can directly hide the BootSplash
  //   };

  //   init().finally(async () => {
  //     // await BootSplash.hide({ fade: true });
  //     //console.log('BootSplash has been hidden successfully');
  //   });
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen} // Add the new screen to the stack
          options={{ headerShown: false, title: 'Recipe Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
