import {Image, SafeAreaView, Text, View} from 'react-native';

export default function QRCode() {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <View className="p-2">
        <Text className="text-center font-jakarta text-slate-800 font-bold text-2xl">
          Scan QR Code
        </Text>
        <Text className="text-center font-jakarta text-slate-800 font-medium max-w-[240px] mx-auto mt-2 text-md">
          Scan QR Code ini untuk menukarkan sampah dengan poin.
        </Text>
        <View className="mt-6">
          <Image
            source={require('../../assets/images/qrcode.png')}
            className="w-72 h-72 rounded-lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
