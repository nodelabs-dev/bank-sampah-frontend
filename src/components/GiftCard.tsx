import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  // Format date and time
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('id-ID', {month: 'long'}).format(date); // Indonesian month names
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function GiftCard({
  navigate,
  giftName,
  stock,
  poin,
  createdAt,
  children,
}: any) {
  return (
    <TouchableOpacity onPress={navigate}>
      <LinearGradient
        colors={['#047857', '#34d399']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 2}}
        className="flex flex-row items-start p-3 rounded-lg space-x-4 mt-2">
        {children}
        <View>
          <View className="flex flex-row space-x-3">
            <View>
              <Text className="font-jakarta text-white text-xs">
                Nama Hadiah
              </Text>
              <Text className="text-white font-jakarta text-xl font-bold">
                {giftName}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">Stock</Text>
              <Text className="text-white font-jakarta text-xl font-bold">
                {stock}
              </Text>
            </View>
          </View>
          <View className="flex flex-row space-x-3">
            <View className="mt-3">
              <Text className="font-jakarta text-white text-xs">Poin</Text>
              <Text className="font-jakarta text-white font-semibold mt-1">
                {poin}
              </Text>
            </View>
            <View className="mt-3">
              <Text className="font-jakarta text-white text-xs">Tanggal</Text>
              <Text className="font-jakarta text-white font-semibold mt-1">
                {formatDateTime(createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
