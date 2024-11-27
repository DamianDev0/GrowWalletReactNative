import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff'};

interface SlideData {
  id: string;
  image: any;
  title: string;
  subtitle: string;
}

interface SlideProps {
  item: SlideData;
}

const Slide: React.FC<SlideProps> = ({item}) => {
  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.slideImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    width: width,
    height: height * 0.67,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  slideImage: {
    width: width * 1,
    height: height * 0.57,
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  subtitle: {
    color: '#d7dbdd',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default Slide;
