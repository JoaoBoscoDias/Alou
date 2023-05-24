import HomeScreen from './screens/HomeScreen';
import BuscarAnime from './screens/BuscarAnime';
import BuscarAnimal from './screens/BuscarAnimal';
import BuscarFilme from './screens/BuscarFilme';
import BuscarManga from './screens/BuscarManga';
import BuscarPessoa from './screens/BuscarPessoa';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

const Stack = createStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: true}} />
                <Stack.Screen name='Buscar Animal' component={BuscarAnimal} options={{headerShown: true}} />
                <Stack.Screen name='Buscar Anime' component={BuscarAnime} options={{headerShown: true}} />
                <Stack.Screen name='Buscar Filme' component={BuscarFilme} options={{headerShown: true}} />
                <Stack.Screen name='Buscar Pessoa' component={BuscarPessoa} options={{headerShown: true}} />
                <Stack.Screen name='Buscar Manga' component={BuscarManga} options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

