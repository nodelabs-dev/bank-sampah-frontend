import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Success({navigation}: any) {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <View className="p-4">
        <View className="mx-auto mb-7 flex h-44 w-44 items-center justify-center rounded-full bg-yellow-400">
          <AntDesign name="check" size={100} color={'green'} />
        </View>
        <Text className="font-jakarta max-w-[330px] text-center text-lg text-slate-800">
          Penukaran mu sudah kami terima dan akan segera kami proses.
        </Text>
        <Text className="font-jakarta mt-3 text-center text-2xl font-bold text-stone-700">
          Terima Kasih! 👍
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeStack')}
            className="mt-5 rounded-lg bg-stone-800 py-3">
            <Text className="font-jakarta text-center text-lg text-white">
              Kembali ke menu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
