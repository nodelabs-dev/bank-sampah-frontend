import React, {ReactElement} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Menu({navigate, title, children}: any) {
  return (
    <TouchableOpacity onPress={navigate}>
      <LinearGradient
        colors={['#047857', '#34d399']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 2}}
        className="flex flex-row items-center p-5 rounded-lg space-x-4 mt-2">
        {children}
        <Text className="text-white font-jakarta max-w-[250px] text-xl font-semibold">
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
