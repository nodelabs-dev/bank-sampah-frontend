import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function HistoryCard({
  navigate,
  title,
  description,
  category,
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
                Jenis Sampah
              </Text>
              <Text className="text-white font-jakarta text-2xl font-bold">
                {title}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">
                Berat Sampah (g)
              </Text>
              <Text className="text-white font-jakarta text-2xl font-bold">
                {description}
              </Text>
            </View>
          </View>
          <View className="mt-9 bg-orange-600 w-auto p-1 rounded-md">
            <Text className="text-white text-center font-semibold font-jakarta">
              {category}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
