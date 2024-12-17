import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNavigation from '../../../hook/useNavigation';
import {Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const COLORS = {primary: '#282534', white: '#fff'};

const {width} = Dimensions.get('screen');

interface FooterProps {
  currentSlideIndex: number;
  slidesLength: number;
  goToNextSlide: () => void;
  skip: () => void;
}

const Footer: React.FC<FooterProps> = ({
  currentSlideIndex,
  slidesLength,
  goToNextSlide,
  skip,
}) => {
  const navigation = useNavigation();

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.replace('Login');
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.indicatorContainer}>
        {Array(slidesLength)
          .fill(null)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
      </View>

      <View style={styles.buttonContainer}>
        {currentSlideIndex === slidesLength - 1 ? (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleGetStarted}>
            <Text style={styles.startButtonText}>GET STARTED</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.skipButton}
              onPress={skip}>
              <Text style={styles.skipButtonText}> SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.nextButton}
              onPress={goToNextSlide}>
              <Text style={styles.nextButtonText}>NEXT </Text>
              <AntDesign name="arrowright" size={20} color="#8E44AD" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    height: 150,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  activeIndicator: {
    backgroundColor: '#5b2c6f',
    width: 25,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  skipButton: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#000',
    flexDirection: 'row',
  },
  skipButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.white,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#8E44AD',
    marginRight: 5,
  },
  startButton: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#8E44AD',
  },
});

export default Footer;
