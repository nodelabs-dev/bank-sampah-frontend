import React from 'react';
import {SafeAreaView, ScrollView, Text, View, Image} from 'react-native';
import formatDateTime from '../../helpers/dateFormatter';
import SkeletonImage from '../../components/SkeletonImage';

export default function MaterialDetail({route}: any) {
  const {item} = route.params;
  console.log('ARTIKEL ==== ', item);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-2" showsVerticalScrollIndicator={false}>
        <View className="mb-4">
          <Text className="font-jakarta text-2xl font-bold mb-2">
            {item?.judul}
          </Text>
          <Text className="font-jakarta text-gray-500">
            {formatDateTime(item?.created_at)}
          </Text>
        </View>
        <SkeletonImage
          uri={item?.url_img}
          style={{
            width: '100%',
            height: 256,
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
        <View className="pb-5">
          <Text className="font-jakarta text-left text-lg leading-7 mb-4">
            {item?.deskripsi}
          </Text>
          <Text className="font-jakarta text-sm text-gray-600">
            Kategori: {item?.kategori}
          </Text>
          <Text className="font-jakarta text-sm text-gray-600">
            Ditulis oleh: {item?.email}
          </Text>
          <Text className="font-jakarta text-sm text-gray-600">
            Diperbarui pada: {formatDateTime(item?.updated_at)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
