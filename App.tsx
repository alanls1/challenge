import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/pages/Home/Home";
import History from "./src/pages/History/History";
import Favorite from "./src/pages/Favorite/Favorite";
import { NavigationContainer } from "@react-navigation/native";
import Word from "./src/pages/Word/Word";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Word"
          component={Word}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
