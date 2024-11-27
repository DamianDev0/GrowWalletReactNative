import {useNavigation as useReactNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationParams} from '../types/navigation.types';

const useNavigation = () => {
  return useReactNavigation<NativeStackNavigationProp<NavigationParams>>();
};

export default useNavigation;
