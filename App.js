import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListPokemons from './pages/ListPokemons'
import DetailPokemon from './pages/DetailPokemon'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListPokemons"
          component={ListPokemons}
          options={{title: 'Listado de Pokemon'}}
        />
        <Stack.Screen
        name="DetailPokemon"
        component={DetailPokemon}
        options={{title: 'Detalle de Pokemon seleccionado'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
