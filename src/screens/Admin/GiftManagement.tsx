import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SkeletonImage from '../../components/SkeletonImage';
import GiftCard from '../../components/GiftCard';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GiftManagement({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [gifts, setGifts] = useState<any>(null);

  const getGiftsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/hadiah`);
      console.log('LIST GIFT === ', response?.data);
      setGifts(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getGiftsHandler();
    }, []),
  );

  const deleteUserHandler = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      await axios.delete(`${process.env.API_URL}/hadiah/delete/${id}`);
      setGifts((prevGifts: any) =>
        prevGifts.filter((gift: any) => gift.id !== id),
      );
      setIsDeleteLoading(false);
    } catch (error) {
      console.error('Failed to delete gift:', error);
      setIsDeleteLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex flex-1 justify-center">
      <View className="p-1.5">
        <TouchableOpacity
          className="bg-yellow-400 py-3 rounded-lg"
          onPress={() => navigation.navigate('NewGift')}>
          <Text className="text-center font-medium font-jakarta text-lg">
            Tambah Hadiah
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator color={'#000'} size={'large'} />
        </View>
      ) : (
        <ScrollView className="px-1.5">
          {gifts ? (
            gifts?.map((item: any) => (
              <GiftCard
                key={item?.id}
                giftName={item?.nama_hadiah}
                stock={item?.stock}
                poin={item?.poin_diperlukan}
                createdAt={item?.created_at}>
                <SkeletonImage
                  uri={
                    item?.url_img !== ''
                      ? item?.url_img
                      : 'https://bnp.jambiprov.go.id/wp-content/uploads/2023/02/3r-1.png'
                  }
                  style={{width: 112, height: 112, borderRadius: 8}}
                />
                <View className="absolute right-4 bottom-4 z-50">
                  <TouchableOpacity onPress={() => deleteUserHandler(item?.id)}>
                    {isDeleteLoading ? (
                      <ActivityIndicator size={'small'} color={'#fff'} />
                    ) : (
                      <Icon name="trash" size={24} color="red" />
                    )}
                  </TouchableOpacity>
                </View>
              </GiftCard>
            ))
          ) : (
            <Text>Hadiah kosong</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
