import axios from 'axios';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export default function NewGift() {
  const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      nama_hadiah: '',
      point: '',
      stock: '',
      description: '',
      image: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nama_hadiah', data.nama_hadiah);
      formData.append('poin_diperlukan', data.point);
      formData.append('stock', data.stock);
      formData.append('deskripsi', data.description);

      if (imageUri) {
        formData.append('UrlImg', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      const response = await axios.post(
        `${process.env.API_URL}/admin/hadiah/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('CREATE DATA RESPONSE ====', response.data);
      setIsLoading(false);
      editSuccessAlert();
      reset();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const editSuccessAlert = () =>
    Alert.alert('Berhasil', 'Sukses menambahkan hadiah baru.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      {isScreenLoading ? (
        <ActivityIndicator size={'large'} color={'#000'} />
      ) : (
        <ScrollView className="p-2" showsVerticalScrollIndicator={false}>
          <View className="mt-3">
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <Text>Nama Hadiah</Text>
                  <TextInput
                    placeholder="Nama hadiah..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="font-jakarta mt-2 rounded-lg border border-slate-300 p-4"
                  />
                </View>
              )}
              name="nama_hadiah"
            />
            {errors.nama_hadiah && (
              <Text className="font-jakarta mt-2 pl-4 text-red-500">
                Nama hadiah wajib diisi
              </Text>
            )}
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View className="mt-6">
                  <Text>Poin</Text>
                  <TextInput
                    placeholder="Poin yang diperlukan..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="font-jakarta mt-2 rounded-lg border border-slate-300 p-4"
                  />
                </View>
              )}
              name="point"
            />
            {errors.point && (
              <Text className="font-jakarta mt-2 pl-4 text-red-500">
                Poin wajib diisi
              </Text>
            )}
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View className="mt-6">
                  <Text>Stock</Text>
                  <TextInput
                    placeholder="Jumlah stok hadiah..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="font-jakarta mt-2 rounded-lg border border-slate-300 p-4"
                  />
                </View>
              )}
              name="stock"
            />
            {errors.stock && (
              <Text className="font-jakarta mt-2 pl-4 text-red-500">
                Stock wajib diisi
              </Text>
            )}
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <View className="mt-6">
                  <Text>Deskripsi</Text>
                  <TextInput
                    placeholder="Deskripsi..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="font-jakarta mt-2 rounded-lg border border-slate-300 p-4"
                  />
                </View>
              )}
              name="description"
            />
            {errors.description && (
              <Text className="font-jakarta mt-2 pl-4 text-red-500">
                Deskripsi wajib diisi
              </Text>
            )}
          </View>
          {imageUri && (
            <Image
              source={{uri: imageUri}}
              style={{
                width: 200,
                height: 200,
                marginTop: 20,
                alignSelf: 'center',
                borderRadius: 10,
              }}
            />
          )}
          <TouchableOpacity
            onPress={selectImage}
            className="mt-6 flex flex-row items-center justify-center space-x-3 rounded-lg border border-emerald-500 p-3">
            <Text className="font-jakarta text-center text-xl font-semibold text-emerald-500">
              Pilih Gambar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            className="mt-3 mb-5 flex flex-row items-center justify-center space-x-3 rounded-lg bg-emerald-500 p-3">
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
