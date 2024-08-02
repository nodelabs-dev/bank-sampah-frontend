import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import UserTradeCard from '../../components/UserTradeCard';
import {useFocusEffect} from '@react-navigation/native';

function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  // Format date and time
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('id-ID', {month: 'long'}).format(date); // Indonesian month names
  const year = date.getFullYear();

  // Combine into the desired format
  return `${day} ${month} ${year}`;
}

export default function PointConfirmation({navigation}: any) {
  const [userTrade, setUserTrade] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPointConfirmationHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/admin/tukar-poin`,
      );
      const sortedData = response?.data?.data.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setUserTrade(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPointConfirmationHandler();
    }, []),
  );

  return (
    <SafeAreaView className="flex flex-1 justify-center">
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <ScrollView
          className="px-1.5 mb-2"
          showsVerticalScrollIndicator={false}>
          {userTrade ? (
            userTrade?.map((item: any) => (
              <UserTradeCard
                key={item?.id}
                navigate={
                  item?.status_qrcode
                    ? () => navigation.navigate('SendPoint', {item})
                    : () => navigation.navigate('QRCode')
                }
                fullname={item?.nama}
                trash={item?.jenis_sampah}
                weight={item?.berat_sampah}
                pointStatus={item?.status !== 'Selesai' ? 'Proses' : 'Terkirim'}
                createdAt={formatDateTime(item?.created_at)}
                qrcodeStatus={item?.status_qrcode ? '✅ selesai' : '❌ belum'}
              />
            ))
          ) : (
            <View className="flex flex-1 justify-center items-center">
              <Text>Konfirmasi Poin Kosong</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
