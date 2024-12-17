import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useRoute, RouteProp} from '@react-navigation/native';
import {NavigationParams} from '../../types/navigation.types';
import useNavigation from '../../hook/useNavigation';

const {width, height} = Dimensions.get('window');

type TransactionDetailsProps = RouteProp<
  NavigationParams,
  'TransactionDetailsScreen'
>;

const TransactionDetailsScreen = () => {
  const route = useRoute<TransactionDetailsProps>();
  const {name, description, icon, amount, date, categoryName} = route.params;
  const navigation = useNavigation();

  const handleGoback = () => {
    navigation.goBack();
  };

  const headerTranslateY = useSharedValue(-100);

  useEffect(() => {
    headerTranslateY.value = withTiming(0, {duration: 800});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    transform: [{translateY: headerTranslateY.value}],
  }));

  const numericAmount = Number(amount);

  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(numericAmount);

  return (
    <LinearGradient
      colors={['#2b1557', '#000']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <TouchableOpacity onPress={handleGoback} style={styles.backIcon}>
        <Icon name="arrow-back" size={28} color="#FFF" />
      </TouchableOpacity>

      <Animated.View style={[styles.header, animatedHeaderStyle]}>
        <Image source={{uri: icon}} style={styles.headerIcon} />
        <View style={styles.amountContainer}>
          <Icon name="trending-down-sharp" size={36} color="#FF3B3B" />
          <Text style={styles.amountText}>{formattedAmount}</Text>
        </View>
      </Animated.View>

      <View style={styles.detailsCard}>
        <Text style={styles.textTitle}>Name</Text>
        <Text style={styles.text}>{name}</Text>

        <Text style={styles.textTitle}>Description</Text>
        <Text style={styles.text}>{description}</Text>

        <Text style={styles.textTitle}>Category</Text>
        <Text style={styles.text}>{categoryName}</Text>

        <Text style={styles.textTitle}>Date</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.4,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerIcon: {
    width: width * 0.35,
    height: height * 0.23,
    resizeMode: 'contain',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFF',
    marginLeft: 10,
    letterSpacing: 1.5,
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    marginTop: 40,
    gap: width * 0.028,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: '#DDD',
    marginBottom: 5,
  },
});

export default TransactionDetailsScreen;
