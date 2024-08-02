import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function UserTradeCard({
  navigate,
  fullname,
  trash,
  weight,
  qrcodeStatus,
  pointStatus,
  disabled,
  createdAt,
}: any) {
  const getTruncatedFullName = (name: string) => {
    const words = name.split(' ');
    return words.length > 2 ? words.slice(0, 2).join(' ') : name;
  };

  return (
    <TouchableOpacity onPress={navigate} disabled={disabled}>
      <LinearGradient
        colors={disabled ? ['#2f2f2f', '#555'] : ['#047857', '#34d399']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 2}}
        className="flex flex-row items-start px-4 py-5 rounded-lg space-x-4 mt-2">
        <View>
          <View className="flex flex-row space-x-3">
            <View>
              <Text className="font-jakarta text-white text-xs">
                Nama Pengguna
              </Text>
              <Text className="text-white font-jakarta text-lg font-bold">
                {getTruncatedFullName(fullname)}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">
                Status Scan
              </Text>
              <Text className="text-white font-jakarta text-lg font-bold">
                {qrcodeStatus}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">
                Status Poin
              </Text>
              <Text className="text-white font-jakarta text-lg font-bold">
                {pointStatus}
              </Text>
            </View>
          </View>
          <View className="flex flex-row space-x-3 mt-3">
            <View>
              <Text className="font-jakarta text-white text-xs">
                Jenis Sampah
              </Text>
              <Text className="text-white font-jakarta text-md font-bold">
                {trash}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">Berat (g)</Text>
              <Text className="text-white font-jakarta text-md font-bold">
                {weight}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">
                Tanggal Penukaran
              </Text>
              <Text className="text-white font-jakarta text-md font-bold">
                {createdAt}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
