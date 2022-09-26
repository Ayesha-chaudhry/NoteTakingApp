import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Main from '../screens/Main';
import CreateNote from '../screens/CreateNote';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Pics from '../screens/Pics';



const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen 
        options={{headerShown:false}}
        name="Splash"
        component={Splash} />
        <Stack.Screen 
        options={{headerShown:false}}
        name="Login"
        component={Login} />   
        <Stack.Screen 
        options={{headerShown:false}}
        name="Signup"
        component={Signup} />                
        <Stack.Screen
        name='Main'
        component={Main}/>

        <Stack.Screen
        name='Create'
        component={CreateNote}/>
        <Stack.Screen 
        name="Pics"
        component={Pics} />
    
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;