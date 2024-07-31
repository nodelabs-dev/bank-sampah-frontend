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
      setHistory(response?.data?.data);
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
        <ScrollView className="px-1.5">
          {history ? (
            history?.map((item: any) => (
              <HistoryCard
                key={item?.id}
                trash={item?.jenis_sampah}
                weight={item?.berat_sampah}
                createdAt={formatDateTime(item?.created_at)}
                navigate={() => navigation.navigate('Material')}>
                <Image
                  source={{
                    uri: 'https://dlh.semarangkota.go.id/wp-content/uploads/2023/01/image_2023-01-02_153843788.png',
                  }}
                  className="w-28 h-28 rounded-md"
                />
              </HistoryCard>
            ))
          ) : (
            <Text>Riwayat Kosong</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
