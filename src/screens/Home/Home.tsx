import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FocusAwareStatusBar from '../../components/StatusBar';
import StatusBarBackground from '../../components/StatusBarBackground';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeOrigin from 'react-native-vector-icons/FontAwesome';
import Menu from '../../components/Menu';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonPic from '../../components/SkeletonPic';

export default function Home({navigation}: any) {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserToken = async () => {
    setIsLoading(true);
    try {
      const verifyUser = await axios.get(`${process.env.API_URL}/users/users`);
      const user = JSON.stringify(verifyUser?.data?.data);
      console.log('VERIFY USER ==== ', verifyUser?.data?.data);
      setUserData(verifyUser?.data?.data);
      await AsyncStorage.setItem('user', user);
      setIsLoading(false);
    } catch (error) {
      console.error('VERIFY USER ERROR ==== ', error);
      navigation.navigate('Login');
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserToken();
    }, []),
  );

  console.log('USER DATAAA ===== ', userData);

  return (
    <View className="flex flex-1">
      {Platform.OS === 'ios' && (
        <StatusBarBackground backgroundColor="#34d399" />
      )}
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#34d399" />
      <LinearGradient
        colors={['#047857', '#34d399']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        className="px-5 py-12 flex mb-0 flex-row items-end justify-between rounded-b-2xl">
        {isLoading ? (
          <View className="flex items-center justify-center flex-1 h-40">
            <ActivityIndicator size={'large'} color={'#fff'} />
          </View>
        ) : (
          <>
            <View>
              <SkeletonPic
                uri={
                  userData?.role !== 'admin'
                    ? userData?.url_profil?.replace(
                        './',
                        `${process.env.API_URL}`,
                      )
                    : userData?.url_profil
                }
                style={{width: 80, height: 80, borderRadius: 50}}
              />
              <View className="flex mt-2 flex-row space-x-1">
                <Text className="font-jakarta text-white text-xl">Halo,</Text>
                <Text className="font-jakarta text-white text-xl font-bold">
                  {userData?.nama_lengkap}
                </Text>
              </View>
              <Text className="font-jakarta text-white">ZEROWASTEMATE</Text>
              {userData?.role !== 'admin' ? (
                <View className="mt-3">
                  <Text className="text-white font-jakarta">
                    Poin Anda{' '}
                    <Text className="font-bold">{userData?.poin} Poin</Text>
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              <Image
                source={require('../../assets/images/ill.png')}
                className="h-32 w-32"
              />
            </View>
          </>
        )}
      </LinearGradient>
      <ScrollView
        className="mt-0 pt-2 px-1.5 mb-2"
        showsVerticalScrollIndicator={false}>
        {userData?.role === 'admin' ? (
          <>
            <Menu
              title="QR Code"
              desc="Buka QR Code untuk discan oleh pengguna."
              navigate={() => navigation.navigate('QRCode')}>
              <FontAwesomeOrigin name="qrcode" color={'white'} size={50} />
            </Menu>
            <Menu
              title="Penukaran Poin"
              desc="Lihat dan konfirmasi pengguna yang telah menukarkan sampah."
              navigate={() => navigation.navigate('PointConfirmation')}>
              <FontAwesome name="coins" color={'white'} size={50} />
            </Menu>
            <Menu
              title="Penukaran Hadiah"
              desc="Lihat riwayat pengguna yang menukar poin ke hadiah."
              navigate={() => navigation.navigate('GiftTradeHistory')}>
              <FontAwesome name="gifts" color={'white'} size={50} />
            </Menu>
          </>
        ) : (
          <>
            <Menu
              title="Materi Pengolahan Sampah"
              desc="Baca artikel-artikel terkait tata cara pengolahan sampah."
              navigate={() => navigation.navigate('Material')}>
              <Entypo name="open-book" color={'white'} size={50} />
            </Menu>
            <Menu
              title="Monitor Sampah"
              desc="Tukar sampah yang Anda temukan dengan poin."
              navigate={() => navigation.navigate('Monitor')}>
              <MaterialIcons name="monitor-heart" color={'white'} size={50} />
            </Menu>
            <Menu
              title="Tukar Poin"
              desc="Tukarkan poin Anda dengan barang-barang yang tersedia."
              navigate={() => navigation.navigate('Point')}>
              <FontAwesome name="coins" color={'white'} size={50} />
            </Menu>
            <Menu
              title="Panggil Petugas"
              desc="Panggil petugas untuk scan QR Code tukar sampah."
              navigate={() => navigation.navigate('Monitor')}>
              <FontAwesomeOrigin name="whatsapp" color={'white'} size={50} />
            </Menu>
          </>
        )}
      </ScrollView>
    </View>
  );
}
