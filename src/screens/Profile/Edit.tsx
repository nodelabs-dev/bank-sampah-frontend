import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
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

export default function Edit() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      nama_lengkap: '',
      username: '',
      poin: '',
      email: '',
      role: '',
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
      const response = await axios.put(
        `${process.env.API_URL}/users/update-data`,
        {
          nama_lengkap: data?.nama_lengkap,
          username: data?.username,
          poin: user?.poin,
          email: user?.email,
          role: '',
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
    Alert.alert('Berhasil', 'Sukses mengubah profil pengguna.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);

  const getUserProfile = async () => {
    setIsScreenLoading(true);
    try {
      const response = await AsyncStorage.getItem('user');
      const userData = JSON.parse(response ?? '');
      console.log('USER DATA EDIT ====', userData);
      setUser(userData);
      reset({
        nama_lengkap: userData?.nama_lengkap,
        username: userData?.username,
      });
      setIsScreenLoading(false);
    } catch (error) {
      console.error(error);
      setIsScreenLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserProfile();
    }, [reset]),
  );

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      {isScreenLoading ? (
        <ActivityIndicator size={'large'} color={'#000'} />
      ) : (
        <ScrollView className="p-1.5" showsVerticalScrollIndicator={false}>
          <View className="mt-3">
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <Text>Nama Lengkap</Text>
                  <TextInput
                    placeholder="Nama Lengkap"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="font-jakarta mt-2 rounded-lg border border-slate-300 p-4"
                  />
                </View>
              )}
              name="nama_lengkap"
            />
            {errors.nama_lengkap && (
              <Text className="font-jakarta mt-2 pl-4 text-red-500">
                Nama lengkap wajib diisi
              </Text>
            )}
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View className="mt-6">
                  <Text>Username</Text>
                  <TextInput
                    placeholder="Username"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="font-jakarta mt-2 rounded-lg border border-slate-300 p-4"
                  />
                </View>
              )}
              name="username"
            />
            {errors.username && (
              <Text className="font-jakarta mt-2 pl-4 text-red-500">
                Username wajib diisi
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
                Simpan
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
