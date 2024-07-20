import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const FocusAwareStatusBar = ({backgroundColor, ...props}: any) => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar backgroundColor={backgroundColor} {...props} />
  ) : null;
};

export default FocusAwareStatusBar;
