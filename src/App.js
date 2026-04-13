import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainScreen from './screens/MainScreen';
import EntryFormScreen from './screens/EntryFormScreen';
import EntryViewScreen from './screens/EntryViewScreen';
import SettingsScreen from './screens/SettingsScreen';
import { AppStateProvider } from './state/AppState';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppStateProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="MainScreen">
                <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EntryFormScreen"
                  component={EntryFormScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EntryViewScreen"
                  component={EntryViewScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SettingsScreen"
                  component={SettingsScreen}
                  options={{ title: 'Settings' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </AppStateProvider>
    </ReduxProvider>
  );
}
