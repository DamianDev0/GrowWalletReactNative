import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useNavigation from '../../hook/useNavigation';
import HeaderHome from './components/headerHome';
import LinearGradient from 'react-native-linear-gradient';
const HomeScreen = () => {
  const navigation = useNavigation();

  const HandleOboarding = () => {
    navigation.navigate('Onboarding');
  };
  return (
    <LinearGradient
      colors={['#000000', '#6a1b9a', '#000000']}
      start={{x: 2, y: 0}}
      end={{x: 0, y: 5}}
      style={styles.container}>
      <View>
        <HeaderHome />
        <TouchableOpacity onPress={HandleOboarding}>
          <Text>Go to onboarding</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#301338',
  },
});

export default HomeScreen;
