import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import AlertPopup from '../../components/Alert';

export default function Monitor({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trashTypes, setTrashTypes] = useState<any[]>([]);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      jenis_sampah: '',
      berat_sampah: '',
    },
  });

  useEffect(() => {
    const fetchTrashTypes = async () => {
      try {
        const response = await axios.get(
          'https://be-zerowastemate.vercel.app/jenissampah',
        );
        setTrashTypes(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrashTypes();
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/transaksi/tukar-poin`,
        {
          jenis_sampah: data.jenis_sampah,
          berat_sampah: Number(data.berat_sampah),
        },
      );

      console.log(response.data);
      const trashId = response?.data?.id;
      setIsLoading(false);
      AlertPopup('Berhasil', 'Berhasil menukar sampah dengan poin.');
      navigation.navigate('ScanQR', {trashId});

      const whatsappNumber = '6285157711068';
      const message = `Halo petugas, saya ingin menukarkan sampah jenis ${data.jenis_sampah} dengan berat ${data.berat_sampah} gram, Terima Kasih!`;
      const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(
        message,
      )}`;
      Linking.openURL(whatsappUrl).catch(err =>
        console.error('Failed to open WhatsApp', err),
      );
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      AlertPopup('Gagal', 'Gagal menukar sampah dengan poin.');
    }
  };

  return (
    <SafeAreaView className="flex flex-1 items-center">
      <View className="p-2 w-full">
        <Text className="text-center pt-5 font-jakarta text-xl font-bold">
          Monitor Sampah
        </Text>
        <Text className="text-center font-jakarta">
          Tukar sampah yang Anda temukan menjadi poin.
        </Text>
        <View className="mt-6">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <View className="flex">
                <Text className="text-slate-600 font-jakarta">
                  Jenis Sampah
                </Text>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  className="rounded-lg mt-2 font-jakarta border border-slate-300 p-4">
                  <Picker.Item label="Pilih jenis sampah" value="" />
                  {trashTypes.map(item => (
                    <Picker.Item
                      key={item.id}
                      label={item.jenis_sampah}
                      value={item.jenis_sampah}
                    />
                  ))}
                </Picker>
              </View>
            )}
            name="jenis_sampah"
          />
          {errors.jenis_sampah && (
            <Text className="mt-2 pl-4 text-red-500 font-jakarta">
              Jenis sampah wajib diisi
            </Text>
          )}

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <View className="flex flex-col mt-6 items-start">
                <Text className="text-slate-600 font-jakarta">
                  Berat Sampah
                </Text>
                <TextInput
                  placeholder="(gram) cth: 10"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="rounded-lg mt-2 w-full font-jakarta border border-slate-300 p-4 pr-12"
                />
              </View>
            )}
            name="berat_sampah"
          />
          <View
            className={`flex flex-row items-center ${
              errors.berat_sampah ? 'justify-between' : 'justify-end'
            }`}>
            {errors.berat_sampah && (
              <Text className="mt-2 pl-4 text-red-500">
                Berat sampah wajib diisi
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="mt-6 flex flex-row items-center justify-center space-x-3 rounded-lg bg-emerald-700 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#ffffff" />
              <Text className="text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="text-center text-xl font-jakarta font-semibold text-white">
              Tukar Sekarang
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
