import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slide from './components/slideOnboarding';
import Footer from './components/footerOnboarding';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../assets/img/welcome.png'),
    title: 'Welcome to GrowWallet',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('../../assets/img/wallet.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../../assets/img/sell.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '4',
    image: require('../../assets/img/chart.png   '),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<FlatList>(null);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#282534" />
      <LinearGradient
        colors={['#000000', '#6a1b9a', '#000000']}
        start={{x: 2, y: 0}}
        end={{x: 0, y: 5}}
        style={styles.gradient}>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({item}) => <Slide item={item} />}
        />
        <Footer
          currentSlideIndex={currentSlideIndex}
          slidesLength={slides.length}
          goToNextSlide={goToNextSlide}
          skip={skip}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  flatListContainer: {
    height: height * 0.6,
  },
});

export default OnboardingScreen;
