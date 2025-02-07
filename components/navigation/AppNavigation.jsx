import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screen/WelcomeScreen';
import HomeSrceen from '../screen/HomeSrceen';
import RecipeScreen from '../screen/RecipeScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeSrceen} />
      <Stack.Screen name="RecipesDetails" component={RecipeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
