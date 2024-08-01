import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function HistoryCard({
  navigate,
  trash,
  weight,
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
                Jenis Sampah
              </Text>
              <Text className="text-white font-jakarta text-xl font-bold">
                {trash}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">
                Berat Sampah (g)
              </Text>
              <Text className="text-white font-jakarta text-xl font-bold">
                {weight}
              </Text>
            </View>
          </View>
          <View className="mt-6 bg-orange-600 w-auto p-1 rounded-md">
            <Text className="text-white text-center font-semibold font-jakarta">
              {createdAt}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
