import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import HistoryCard from '../../components/HistoryCard';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import formatDateTime from '../../helpers/dateFormatter';
import {useFocusEffect} from '@react-navigation/native';

export default function History({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any>(null);

  const getHistoryPointTradeHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/riwayat/tukar-poin`,
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
      getHistoryPointTradeHandler();
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
              <HistoryCard
                key={item?.id}
                trash={item?.jenis_sampah}
                weight={item?.berat_sampah}
                createdAt={formatDateTime(item?.created_at)}>
                <Image
                  source={require('../../assets/images/trashType.png')}
                  className="w-24 h-24 rounded-md"
                />
              </HistoryCard>
            ))
          ) : (
            <View className="flex flex-1 mt-72 justify-center items-center">
              <Text className="font-jakarta text-lg">Riwayat Kosong.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
