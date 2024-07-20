import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import History from './src/screens/History/History';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Riwayat') {
            iconName = 'reload1';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else {
            iconName = '';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'darkgreen',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontFamily: 'Plus Jakarta Sans'},
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name="Riwayat"
        component={History}
        options={{headerShown: false, title: 'Riwayat'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
