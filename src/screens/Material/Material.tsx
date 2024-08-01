import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Article from '../../components/Material';
import SkeletonImage from '../../components/SkeletonImage';

export default function Material({navigation}: any) {
  const [material, setMaterial] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMaterialsHandler = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.API_URL}/materi`);
        console.log(response?.data?.data);
        setMaterial(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getMaterialsHandler();
  }, []);

  return (
    <SafeAreaView className="flex flex-1 justify-center">
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <ScrollView
          className="px-1.5 mb-2"
          showsVerticalScrollIndicator={false}>
          {material ? (
            material?.map((item: any) => (
              <Article
                key={item?.id}
                navigate={() => navigation.navigate('MaterialDetail', {item})}
                title={item?.judul}
                description={item?.deskripsi}
                category={item?.kategori}>
                <SkeletonImage
                  uri={item?.url_img}
                  style={{width: 112, height: 112, borderRadius: 8}}
                />
              </Article>
            ))
          ) : (
            <Text>Materi Kosong</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
