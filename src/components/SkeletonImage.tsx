import React, {useState} from 'react';
import {View, Image, ActivityIndicator, StyleSheet} from 'react-native';

const SkeletonImage = ({uri, style}: any) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[style, styles.container]}>
      {isLoading && (
        <View style={styles.skeleton}>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      )}
      <Image
        source={{uri}}
        style={[style, isLoading && styles.imageHidden]}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Match your image border radius
  },
  imageHidden: {
    opacity: 0,
  },
});

export default SkeletonImage;
