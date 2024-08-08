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

export default function GiftManagement() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  return (
    <SafeAreaView className="flex flex-1 justify-center">
      <View className="p-1.5">
        <TouchableOpacity className="bg-yellow-400 py-3 rounded-lg">
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
