import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import truncateText from '../helpers/textTruncate';

export default function RewardCard({
  navigate,
  title,
  description,
  stock,
  children,
  neededPoint,
}: any) {
  return (
    <TouchableOpacity onPress={navigate}>
      <LinearGradient
        colors={['#047857', '#34d399']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 2}}
        className="flex flex-row items-start p-2 rounded-lg space-x-3 mt-2">
        {children}
        <View>
          <Text className="font-jakarta text-white text-xs">Nama</Text>
          <Text className="text-white font-jakarta max-w-[220px] text-lg font-bold">
            {title}
          </Text>
          <Text
            className="text-white font-jakarta mt-1 font-medium max-w-[230px]"
            numberOfLines={3}
            ellipsizeMode="tail">
            {description}
          </Text>
          <View className="flex flex-row space-x-4">
            <View>
              <Text className="font-jakarta text-white text-xs">Stok</Text>
              <Text className="text-white text-left font-semibold font-jakarta">
                {stock} Item
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">
                Poin diperlukan
              </Text>
              <Text className="text-white text-left font-semibold font-jakarta">
                {neededPoint} Poin
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
