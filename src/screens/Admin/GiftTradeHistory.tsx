import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useCallback, useState} from 'react';
import axios from 'axios';
import formatDateTime from '../../helpers/dateFormatter';
import {useFocusEffect} from '@react-navigation/native';
import GiftHistoryCard from '../../components/GiftHistoryCard';
import SkeletonImage from '../../components/SkeletonImage';

export default function GiftTradeHistory({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any>(null);

  const getGiftTradeHistoryHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/admin/tukar-hadiah`,
      );
      const sortedHistory = response?.data?.data?.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setHistory(sortedHistory);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getGiftTradeHistoryHandler();
    }, []),
  );

  return (
    <SafeAreaView className="flex flex-1 justify-center">
      {isLoading ? (
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      ) : (
        <ScrollView className="px-1.5" showsVerticalScrollIndicator={false}>
          {history ? (
            history?.map((item: any) => (
              <GiftHistoryCard
                key={item?.id}
                giftName={item?.nama_hadiah}
                quantity={item?.jumlah}
                email={item?.email}
                createdAt={item?.created_at}>
                <SkeletonImage
                  uri={
                    item?.url_img !== ''
                      ? item?.url_img
                      : 'https://bnp.jambiprov.go.id/wp-content/uploads/2023/02/3r-1.png'
                  }
                  style={{width: 112, height: 112, borderRadius: 8}}
                />
              </GiftHistoryCard>
            ))
          ) : (
            <Text>Riwayat Kosong</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
