import React, {ReactElement} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Material({
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
          <Text className="text-white font-jakarta max-w-[250px] text-xl font-bold">
            {title}
          </Text>
          <Text className="text-white font-jakarta mt-1 font-medium">
            {description}
          </Text>
          <View className="mt-9 bg-orange-600 w-24 p-1 rounded-md">
            <Text className="text-white text-center font-semibold font-jakarta">
              {category}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
