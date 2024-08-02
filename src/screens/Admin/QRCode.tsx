import axios from 'axios';
import {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import SkeletonImage from '../../components/SkeletonImage';

export default function QRCode() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qrcode, setQrcode] = useState<string | null>(null);

  useEffect(() => {
    const getQRCodeHandler = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.API_URL}/admin/qrcode/1?format=png`,
          {
            responseType: 'blob',
          },
        );

        const imageURL = URL.createObjectURL(response.data);
        setQrcode(imageURL);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getQRCodeHandler();
  }, []);

  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <View className="p-2">
        <Text className="text-center font-jakarta text-slate-800 font-bold text-2xl">
          Scan QR Code
        </Text>
        <Text className="text-center font-jakarta text-slate-800 font-medium max-w-[240px] mx-auto mt-2 text-md">
          Scan QR Code ini untuk menukarkan sampah dengan poin.
        </Text>
        <View className="flex mt-6 items-center justify-center">
          <SkeletonImage
            uri={qrcode}
            style={{width: 330, height: 330, borderRadius: 20}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
