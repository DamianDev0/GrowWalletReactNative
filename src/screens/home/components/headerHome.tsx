import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../../../context/useAuthContext';
import useWalletBalance from '../hooks/useHeader';

const {width, height} = Dimensions.get('screen');

const HeaderHome: React.FC = () => {
  const {name} = useAuth();
  const {wallet, loading, error, handleLogout} = useWalletBalance();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.greeting}>Hello, {name}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {loading && <Text style={styles.loadingText}>Loading balance...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {wallet && (
        <LinearGradient
        colors={['#8E2DE2', '#D862BC', '#7C00FE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
          style={styles.card}>
          <Text style={styles.cardLogo}>GrowWallet</Text>
          <Image
            source={require('../../../assets/img/chip.png')}
            style={styles.chip}
          />
          <Text style={styles.cardText}>Total balance</Text>
          <Text style={styles.cardBalance}>
            {wallet.balance.toLocaleString()} {wallet.currency}
          </Text>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    alignItems: 'center',
    height: height * 0.45,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 1,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: width * 0.03,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    marginTop: 30,
    borderRadius: 16,
    width: width * 0.95,
    height: height * 0.27,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  chip: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 80,
    left: 20,
  },
  cardText: {
    color: '#FFF',
    fontSize: 15,
    position: 'absolute',
    fontWeight: '200',
    top: 145,
    left: 20,
  },
  cardBalance: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
  cardLogo: {
    fontSize: 22,
    color: '#FFF',
    position: 'absolute',
    fontWeight: 'ultralight',
    top: 20,
    right: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default HeaderHome;
