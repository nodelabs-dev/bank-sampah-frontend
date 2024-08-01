import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SkeletonImage from '../../components/SkeletonImage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertPopup from '../../components/Alert';

export default function PointDetail({route, navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<any>(1);
  const [userPoint, setUserPoint] = useState(null);
  const {reward} = route.params;
  console.log('REWARD ==== ', reward);

  useEffect(() => {
    const getUserData = async () => {
      const response = await AsyncStorage.getItem('user');
      const userData = JSON.parse(response || '');
      setUserPoint(userData?.poin);
    };

    getUserData();
  }, []);

  console.log('RESPONSE USER DATA POINT DETAIL === ', userPoint);

  const postRewardHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/transaksi/tukar-hadiah`,
        {
          id_hadiah: reward?.id,
          jumlah: quantity,
        },
      );

      console.log('EDIT DATA RESPONSE ====', response.data);
      setIsLoading(false);
      navigation.navigate('Success');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      AlertPopup(
        'Penukaran Gagal',
        'Gagal menukarkan poin. Poin Anda tidak cukup!',
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-2" showsVerticalScrollIndicator={false}>
        <SkeletonImage
          uri={reward?.url_img}
          style={{
            width: '100%',
            height: 256,
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
        <View className="mb-4">
          <Text className="font-jakarta text-slate-800 text-center text-2xl font-semibold mb-2">
            {reward?.nama_hadiah}
          </Text>
        </View>
        <View className="bg-slate-50 rounded-lg p-4">
          <View className="flex flex-row space-x-5">
            <View>
              <Text className="font-jakarta text-slate-600 text-sm">
                Poin Anda
              </Text>
              <Text className="font-jakarta text-lg text-slate-800 font-semibold">
                {userPoint} Poin
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-slate-600 text-sm">
                Poin diperlukan
              </Text>
              <Text className="font-jakarta text-lg text-slate-800 font-semibold">
                {reward?.poin_diperlukan} Poin
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-slate-600 text-sm">
                Stok barang
              </Text>
              <Text className="font-jakarta text-lg text-slate-800 font-semibold">
                {reward?.stock} Item
              </Text>
            </View>
          </View>
          <View className="mt-4">
            <Text className="font-jakarta text-slate-600 text-sm">
              Deskripsi
            </Text>
            <Text className="font-jakarta text-left text-lg leading-7">
              {reward?.deskripsi}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="px-2 pb-2">
        <View className="flex flex-row items-center justify-around pb-2">
          <View className="flex w-[83%] flex-row items-center justify-center space-x-4 rounded-lg bg-emerald-600">
            <TouchableOpacity
              disabled={quantity === 1}
              onPress={() => setQuantity(quantity - 1)}
              className="flex flex-row items-center justify-center rounded-lg px-6 py-4">
              <AntDesign name="minus" size={20} color={'white'} />
            </TouchableOpacity>
            <Text className="ext-center font-jakarta text-lg font-semibold text-slate-100">
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              className="flex flex-row items-center justify-center rounded-lg px-6 py-4">
              <AntDesign name="plus" size={20} color={'white'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={postRewardHandler}
            className="flex items-center justify-center rounded-lg bg-emerald-600 p-3">
            {isLoading ? (
              <ActivityIndicator size={30} color={'#fff'} />
            ) : (
              <AntDesign name="caretright" size={30} color={'white'} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
