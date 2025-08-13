import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Contact from './src/screens/Contact';
import { ThemeProvider } from './src/theme';
import { seedIfEmpty } from './src/storage';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    seedIfEmpty();
  }, []);
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
