import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SendPoint({route, navigation}: any) {
  const {item} = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      poin_hasil: '',
    },
  });

  const fetchtUserData = async () => {
    const response = await axios.get(`${process.env.API_URL}/users/users`);
    await AsyncStorage.setItem('user', JSON.stringify(response.data?.data));

    console.log('INI DATA USER === ', response.data);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/admin/confirm-tukarpoin/${item?.id}`,
        {
          poin_hasil: parseInt(data?.poin_hasil, 10), // Convert poin_hasil to number
        },
      );

      console.log('EDIT DATA RESPONSE ====', response.data);
      setIsLoading(false);
      fetchtUserData();
      editSuccessAlert();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const editSuccessAlert = () =>
    Alert.alert('Berhasil', 'Sukses mengirimkan poin.', [
      {
        text: 'Oke',
        onPress: () => navigation.navigate('PointConfirmation'),
      },
    ]);

  console.log('ITEM KIRIM POIN === ', item);

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <ScrollView className="p-1.5" showsVerticalScrollIndicator={false}>
        <View className="mt-3">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text>Jumlah Poin</Text>
                <TextInput
                  placeholder="Masukkan jumlah poin untuk ditukar..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="font-jakarta mt-2 rounded-lg border border-slate-300 p-4"
                  keyboardType="numeric" // Ensure the input is numeric
                />
              </View>
            )}
            name="poin_hasil"
          />
          {errors.poin_hasil && (
            <Text className="font-jakarta mt-2 pl-4 text-red-500">
              Poin wajib diisi
            </Text>
          )}
        </View>

        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-3 flex flex-row items-center justify-center space-x-3 rounded-lg bg-emerald-500 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="font-jakarta text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="font-jakarta text-center text-xl font-semibold text-white">
              Kirim
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
