import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useNavigation from '../../hook/useNavigation';
const HomeScreen = () => {
  const navigation = useNavigation();

  const HandleOboarding = () => {
    navigation.navigate('Onboarding');
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={HandleOboarding}>
        <Text>Go to onboarding</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
