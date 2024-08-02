import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import History from './src/screens/History/History';
import Material from './src/screens/Material/Material';
import Monitor from './src/screens/Monitor/Monitor';
import Point from './src/screens/Point/Point';
import ScanQR from './src/screens/Monitor/ScanQR';
import QRScanner from './src/screens/Monitor/QRScanner';
import {ActivityIndicator, View} from 'react-native';
import Edit from './src/screens/Profile/Edit';
import MaterialDetail from './src/screens/Material/MaterialDetail';
import PointDetail from './src/screens/Point/PointDetail';
import Success from './src/screens/Point/Success';
import QRCode from './src/screens/Admin/QRCode';
import PointConfirmation from './src/screens/Admin/PointConfirmation';
import SendPoint from './src/screens/Admin/SendPoint';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, title: 'Profile'}}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{headerShown: true, title: 'Edit Profile'}}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, title: 'Home'}}
      />
      <Stack.Screen
        name="Material"
        component={Material}
        options={{headerShown: true, title: 'Materi Pengolahan Sampah'}}
      />
      <Stack.Screen
        name="MaterialDetail"
        component={MaterialDetail}
        options={{headerShown: true, title: 'Artikel'}}
      />
      <Stack.Screen
        name="Monitor"
        component={Monitor}
        options={{headerShown: true, title: 'Monitor'}}
      />
      <Stack.Screen
        name="Point"
        component={Point}
        options={{headerShown: true, title: 'Tukar Poin'}}
      />
      <Stack.Screen
        name="PointDetail"
        component={PointDetail}
        options={{headerShown: true, title: 'Detail Barang'}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScanQR"
        component={ScanQR}
        options={{headerShown: true, title: 'Scan QR'}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{headerShown: false, title: 'QR Scanner'}}
      />

      {/* ADMIN SCREEN */}
      <Stack.Screen
        name="QRCode"
        component={QRCode}
        options={{headerShown: true, title: 'QR Code'}}
      />
      <Stack.Screen
        name="PointConfirmation"
        component={PointConfirmation}
        options={{headerShown: true, title: 'Konfirmasi Poin'}}
      />
      <Stack.Screen
        name="SendPoint"
        component={SendPoint}
        options={{headerShown: true, title: 'Kirim Poin'}}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'Riwayat') {
            iconName = 'reload1';
          } else if (route.name === 'ProfileStack') {
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
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name="Riwayat"
        component={History}
        options={{headerShown: true, title: 'Riwayat'}}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{headerShown: false, title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  if (isLoading) {
    <View className="flex flex-1 justify-center items-center bg-white">
      <ActivityIndicator size={'large'} color={'white'} />
    </View>;
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user !== null ? 'MainTabs' : 'Login'}>
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
