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
          password: data.password,
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
    console.log(process.env.API_URL);
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
        <View className="w-full flex-1 items-center justify-center">
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-32 h-32"
          />
          <Text className="text-2xl text-slate-800 font-bold font-jakarta">
            Buat Akun Baru!
          </Text>
        </View>
        <View className="mt-6">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text className="font-jakarta mb-1.5 ml-3">Email</Text>
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="rounded-full border font-jakarta border-slate-300 p-4"
                />
              </View>
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
              <View className="mt-3.5">
                <Text className="font-jakarta ml-3 mb-1.5">Nama Lengkap</Text>
                <TextInput
                  placeholder="Nama Lengkap"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="rounded-full border font-jakarta border-slate-300 p-4"
                />
              </View>
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
              <View className="mt-3.5">
                <Text className="mb-1.5 ml-3 font-jakarta">Username</Text>
                <TextInput
                  placeholder="Username"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="rounded-full border font-jakarta border-slate-300 p-4"
                />
              </View>
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
              <View className="mt-3.5">
                <Text className="ml-3 mb-1.5 font-jakarta">Buat Password</Text>
                <TextInput
                  placeholder="Buat Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="rounded-full border font-jakarta border-slate-300 p-4"
                />
              </View>
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
          className="mt-5 flex flex-row items-center justify-center space-x-3 rounded-full bg-emerald-700 p-3">
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
            <Text className="text-lg font-jakarta text-emerald-600">
              {' '}
              Masuk disini
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
