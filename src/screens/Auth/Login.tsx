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
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Login({navigation}: any): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.API_URL}/user/login`, {
        email: data.email.toLowerCase(),
        password: data.password,
      });

      const verifyUser = await axios.get(`${process.env.API_URL}/users/users`);
      console.log('VERIFY USER ==== ', verifyUser?.data?.data);

      await AsyncStorage.setItem('auth', JSON.stringify(response?.data));
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(verifyUser?.data?.data),
      );
      console.log(response.data);
      navigation.navigate('MainTabs');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      loginErrorAlert();
    }
  };

  useEffect(() => {
    console.log('API_URL LOGIN ==== ', process.env.API_URL);
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('auth');
      console.log('INI LOGIN ASYNC ==== ', userData);
    };

    getUserData();
  }, []);

  const loginErrorAlert = () =>
    Alert.alert('Gagal Masuk', 'Email atau password Anda salah.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);

  return (
    <SafeAreaView className="flex flex-1">
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-1.5">
        <View className="w-full flex items-center justify-center">
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-32 h-32"
          />
          <Text className="text-2xl font-bold font-jakarta text-slate-800">
            Selamat datang!
          </Text>
          <Text className="font-jakarta text-center mt-2 max-w-[230px] text-slate-700">
            Silahkan login menggunakan akun Anda yang sudah terdaftar.
          </Text>
        </View>
        <View className="mt-10">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text className="font-jakarta mb-3 ml-3">Email</Text>
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="rounded-full font-jakarta border border-slate-300 p-4"
                />
              </View>
            )}
            name="email"
          />
          {errors.email && (
            <Text className="mt-2 pl-4 text-red-500 font-jakarta">
              Email wajib diisi
            </Text>
          )}

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <View className="mt-6">
                <Text className="font-jakarta mb-3 ml-3">Password</Text>
                <View className="flex flex-row items-center">
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="rounded-full w-full font-jakarta border border-slate-300 p-4 pr-12"
                  />
                  <Pressable
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-6">
                    {isPasswordVisible ? (
                      <FeatherIcon name="eye" size={24} color={'darkgreen'} />
                    ) : (
                      <FeatherIcon
                        name="eye-off"
                        size={24}
                        color={'darkgreen'}
                      />
                    )}
                  </Pressable>
                </View>
              </View>
            )}
            name="password"
          />
          <View
            className={`flex flex-row items-center ${
              errors.password ? 'justify-between' : 'justify-end'
            }`}>
            {errors.password && (
              <Text className="mt-2 pl-4 text-red-500">
                Password wajib diisi
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-6 flex flex-row items-center justify-center space-x-3 rounded-full bg-emerald-700 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="text-center text-xl font-jakarta font-semibold text-white">
              Masuk
            </Text>
          )}
        </TouchableOpacity>
        <View className="mt-5 flex-row items-center justify-center">
          <Text className="h-14 text-lg font-jakarta">Belum punya akun?</Text>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            className="h-14">
            <Text className="text-lg text-emerald-600 font-jakarta">
              {' '}
              Daftar disini
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
