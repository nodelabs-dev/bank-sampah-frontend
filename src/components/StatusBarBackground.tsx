import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';

const StatusBarBackground = ({backgroundColor, ...props}: any) => (
  <View style={[styles.statusBar, {backgroundColor}]} {...props} />
);

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 56 : StatusBar.currentHeight,
  },
});

export default StatusBarBackground;
