import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FocusAwareStatusBar from '../../components/StatusBar';
import StatusBarBackground from '../../components/StatusBarBackground';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeOrigin from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const getUserToken = async () => {
      const user: any = await AsyncStorage.getItem('user');
      setUserData(JSON.parse(user));
    };

    getUserToken();
  }, []);

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
        className="px-5 py-12 flex mb-4 flex-row items-end justify-between rounded-b-2xl">
        <View>
          <Image
            source={require('../../assets/images/profile.jpeg')}
            className="h-20 w-20 rounded-full border-2 border-emerald-100"
          />
          <View className="flex mt-2 flex-row space-x-1">
            <Text className="font-jakarta text-white text-xl">Halo,</Text>
            <Text className="font-jakarta text-white text-xl font-bold">
              {userData?.nama_lengkap}
            </Text>
          </View>
          <Text className="font-jakarta text-white">ZEROWASTEMATE</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/images/ill.png')}
            className="h-32 w-32"
          />
        </View>
      </LinearGradient>
      <ScrollView className="mt-0 px-1.5 flex space-y-2">
        <LinearGradient
          colors={['#047857', '#34d399']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 2}}
          className="flex flex-row items-center p-5 rounded-lg space-x-4">
          <Entypo name="open-book" color={'white'} size={50} />
          <Text className="text-white font-jakarta max-w-[250px] text-xl font-semibold">
            Materi Pengolahan Sampah
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={['#047857', '#34d399']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 2}}
          className="flex flex-row items-center p-5 rounded-lg space-x-4">
          <MaterialIcons name="monitor-heart" color={'white'} size={50} />
          <Text className="text-white font-jakarta max-w-[250px] text-xl font-semibold">
            Monitor Sampah
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={['#047857', '#34d399']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 2}}
          className="flex flex-row items-center p-5 rounded-lg space-x-4">
          <FontAwesome name="coins" color={'white'} size={50} />
          <Text className="text-white font-jakarta max-w-[250px] text-xl font-semibold">
            Tukar Poin
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={['#047857', '#34d399']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 2}}
          className="flex flex-row items-center p-5 rounded-lg space-x-4">
          <FontAwesomeOrigin name="whatsapp" color={'white'} size={50} />
          <Text className="text-white font-jakarta max-w-[250px] text-xl font-semibold">
            Panggil Petugas
          </Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
