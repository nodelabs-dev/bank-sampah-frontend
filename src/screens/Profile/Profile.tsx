import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SkeletonPic from '../../components/SkeletonPic';

export default function Profile({navigation}: any) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response: any = await AsyncStorage.getItem('user');
      console.log('INI DATA USERR === ', response);
      setUser(JSON.parse(response));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, []),
  );

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
      const response = await axios.post(`${process.env.API_URL}/users/logout`);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('auth');
      setIsLogoutLoading(false);
      console.log(response.data);
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
      setIsLogoutLoading(false);
    }
  };

  console.log('INI USER DATA DI PROFILE USESTATE ==== ', user);
  return (
    <View className="flex flex-1 justify-center">
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          className="p-0">
          <LinearGradient
            colors={['#047857', '#34d399']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            className="flex items-center justify-center rounded-b-3xl bg-stone-800 px-6 py-8">
            <SkeletonPic
              uri={user?.url_profil}
              style={{width: 112, height: 112, borderRadius: 100}}
            />
            <Text className="font-jakarta mt-4 text-center text-2xl font-semibold text-white">
              {user?.nama_lengkap}
            </Text>
            <Text className="font-jakarta text-center text-lg text-white">
              {user?.email}
            </Text>
          </LinearGradient>
          {user?.role !== 'admin' ? (
            <View className="mt-5 p-0">
              <Text className="font-jakarta pl-1.5 text-xl font-semibold text-slate-800">
                Akun
              </Text>
              <View className="mt-4 flex space-y-6 rounded-none bg-white p-4">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Edit')}
                  className="flex flex-row items-center space-x-3">
                  <AntDesign name={'user'} size={20} color={'grey'} />
                  <Text className="font-jakarta text-lg font-medium text-stone-700">
                    Edit Profile
                  </Text>
                </TouchableOpacity>
                {user?.role !== 'admin' ? (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('https://wa.me/6285157711068');
                    }}
                    className="flex flex-row items-center space-x-3">
                    <AntDesign name={'warning'} size={20} color={'orange'} />
                    <Text className="font-jakarta text-lg font-medium text-orange-400">
                      Laporkan Masalah
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  className="flex flex-row items-center space-x-3"
                  onPress={handleLogout}>
                  <AntDesign name={'logout'} size={20} color={'red'} />
                  {isLogoutLoading ? (
                    <View className="flex items-center justify-center">
                      <ActivityIndicator size={'large'} color={'#000'} />
                    </View>
                  ) : (
                    <Text className="font-jakarta text-lg font-medium text-red-500">
                      Keluar
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="bg-white p-5 mt-5">
              <TouchableOpacity
                className="flex flex-row items-center space-x-3"
                onPress={handleLogout}>
                <AntDesign name={'logout'} size={20} color={'red'} />
                {isLogoutLoading ? (
                  <View className="flex items-center justify-center">
                    <ActivityIndicator size={'large'} color={'#000'} />
                  </View>
                ) : (
                  <Text className="font-jakarta text-lg font-medium text-red-500">
                    Keluar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
