import React, {ReactElement} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Menu({navigate, title, desc, children}: any) {
  return (
    <TouchableOpacity onPress={navigate}>
      <LinearGradient
        colors={['#047857', '#34d399']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 2}}
        className="flex flex-row items-center p-5 rounded-lg space-x-4 mb-2">
        {children}
        <View>
          <Text className="text-white font-jakarta max-w-[250px] text-xl font-semibold">
            {title}
          </Text>
          <Text className="mt-1 font-medium text-white font-jakarta max-w-[220px]">
            {desc}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
