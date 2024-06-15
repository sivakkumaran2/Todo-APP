import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import TodoScreen from './screens/TodoScreen';
import AboutPage from './screens/AboutScreen';
import ShoppingListPage from './screens/ShoppingList';
import NotesPage from './screens/Notes';
import WorkScreen from './screens/WorkScreen';
import PersonalScreen from './screens/PersonalScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007bff', 
      },
      headerTintColor: '#fff', 
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <Stack.Screen name="Todo" component={TodoScreen} options={{ title: 'Todo' }} />
    <Stack.Screen name="ShoppingList" component={ShoppingListPage} options={{ title: 'Shopping List' }} />
    <Stack.Screen name="Notes" component={NotesPage} options={{ title: 'Notes' }} />
    <Stack.Screen name="PersonalLists" component={PersonalScreen} options={{ title: 'Personal Lists' }} />
    <Stack.Screen name="WorkLists" component={WorkScreen} options={{ title: 'Work Lists' }} />
    <Stack.Screen name="About" component={AboutPage} options={{ title: 'About' }} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#f0f0f0', 
      }}
      drawerContentOptions={{
        activeTintColor: '#007bff',
        inactiveTintColor: '#333', 
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen name="Home" component={HomeStack} options={{ title: 'Home' }} />
      <Drawer.Screen name="Todo" component={TodoScreen} options={{ title: 'Todo' }} />
      <Drawer.Screen name="ShoppingLists" component={ShoppingListPage} options={{ title: 'Shopping Lists' }} />
      <Drawer.Screen name="PersonalLists" component={PersonalScreen} options={{ title: 'Personal Lists' }} />
      <Drawer.Screen name="WorkLists" component={WorkScreen} options={{ title: 'Work Lists' }} />
      <Drawer.Screen name="Notes" component={NotesPage} options={{ title: 'Notes' }} />
      <Drawer.Screen name="About" component={AboutPage} options={{ title: 'About' }} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
