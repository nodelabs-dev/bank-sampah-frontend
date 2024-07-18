import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}: any): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nama_lengkap: '',
      username: '',
      email: '',
      password: '',
      role: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/user/register`,
        {
          nama_lengkap: data.nama_lengkap,
          username: data.username,
          email: data.email.toLowerCase(),
          Password: data.password,
          role: '',
        },
      );
      console.log('REGISTER RESPONSE === ', response.data);
      navigation.navigate('Login');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      registerErrorAlert();
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      console.log('INI REGISTER ASYNC ==== ', userData);
    };

    getUserData();
  }, []);

  const registerErrorAlert = () =>
    Alert.alert('Gagal Mendaftar', 'Email sudah digunakan.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-4">
        <View className="mt-10 w-full flex-1 items-center justify-center">
          <Text className="text-2xl font-semibold font-jakarta">
            Selamat datang!
          </Text>
        </View>
        <View className="mt-10">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="rounded-full border font-jakarta border-slate-300 p-4"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="mt-2 pl-4 text-red-500">Email wajib diisi</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Nama Lengkap"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-full border font-jakarta border-slate-300 p-4"
              />
            )}
            name="nama_lengkap"
          />
          {errors.nama_lengkap && (
            <Text className="mt-2 pl-4 text-red-500">
              Nama lengkap wajib diisi
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-full border font-jakarta border-slate-300 p-4"
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text className="mt-2 pl-4 text-red-500">
              Nomor WhatsApp wajib diisi
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Buat Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-full border font-jakarta border-slate-300 p-4"
              />
            )}
            name="password"
          />
        </View>
        {errors.password && (
          <Text className="mt-2 pl-4 text-red-500">Password wajib diisi</Text>
        )}
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-5 flex flex-row items-center justify-center space-x-3 rounded-full bg-amber-500 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="font-jakarta text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="font-jakarta text-center text-xl font-semibold text-white">
              Daftar
            </Text>
          )}
        </TouchableOpacity>
        <View className="mt-5 flex-row justify-center">
          <Text className="h-14 text-lg font-jakarta">Sudah punya akun?</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            className="h-14">
            <Text className="text-lg font-jakarta text-amber-600">
              {' '}
              Masuk disini
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
