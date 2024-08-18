import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import RecipeScreen from './components/RecipeScreen'; // Import the new screen

const Stack = createStackNavigator();

const App = () => {
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
          options={{ headerShown: false }}
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
