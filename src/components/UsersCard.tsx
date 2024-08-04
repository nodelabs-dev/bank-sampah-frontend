import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import formatDateTime from '../helpers/dateFormatter';

const truncateEmail = (email: string) => {
  if (email.length > 10) {
    return email.substring(0, 10) + '...';
  }
  return email;
};

export default function UsersCard({
  fullname,
  email,
  point,
  createdAt,
  children,
}: any) {
  return (
    <View>
      <LinearGradient
        colors={['#047857', '#34d399']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 2}}
        className="flex flex-row items-start p-3 rounded-lg space-x-4 mt-2">
        {children}
        <View>
          <View className="flex flex-col space-y-2">
            <View className="flex flex-row space-x-3">
              <View>
                <Text className="font-jakarta text-white text-xs">
                  Nama Lengkap
                </Text>
                <Text className="text-white font-jakarta text-md font-bold">
                  {fullname}
                </Text>
              </View>
              <View>
                <Text className="font-jakarta text-white text-xs">Poin</Text>
                <Text className="text-white font-jakarta text-md font-bold">
                  {point}
                </Text>
              </View>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">Email</Text>
              <Text className="text-white font-jakarta text-md font-bold">
                {email}
              </Text>
            </View>
            <View>
              <Text className="font-jakarta text-white text-xs">
                Dibuat pada
              </Text>
              <Text className="text-white font-jakarta text-md font-bold">
                {formatDateTime(createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
