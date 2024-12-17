import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useAuth} from '../../../context/useAuthContext';
import {WalletResponse} from '../../../interfaces/wallet.interface';
import ModalUserCreateCategories from './modalUserCategories';
import useCategoriesModal from '../hooks/useCategoriesModal';

const {width, height} = Dimensions.get('screen');

interface HeaderHomeProps {
  wallet: WalletResponse['data'] | null;
  loading: boolean;
  error: string | null;
  handleLogout: () => void;
}

const HeaderHome: React.FC<HeaderHomeProps> = ({
  wallet,
  error,
  handleLogout,
}) => {
  const {name} = useAuth();
  const {openModal, closeModal, isVisible} = useCategoriesModal();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.greetingContainer}>
          <Image
            source={require('../../../assets/img/4.png')}
            style={styles.profileImage}
          />
          <Text style={styles.greeting}>Hello, {name}!</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.modalButton} onPress={openModal}>
            <Image
              source={require('../../../assets/img/addCategories.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Image
              source={require('../../../assets/img/logout.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {wallet && (
        <ImageBackground
          source={require('../../../assets/img/3.png')}
          style={styles.card}
          imageStyle={styles.cardImage}>
          <Image
            source={require('../../../assets/img/chip.png')}
            style={styles.chip}
          />
          <Text style={styles.cardText}>Total balance</Text>
          <Text style={styles.cardBalance}>
            {wallet.balance.toLocaleString()} {wallet.currency}
          </Text>
        </ImageBackground>
      )}

      <ModalUserCreateCategories
        isVisible={isVisible}
        closeModal={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    alignItems: 'center',
    height: height * 0.34,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 1,
    alignItems: 'center',
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.03,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  greeting: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.27,
  },
  logoutButton: {
    marginRight: 10,
  },
  modalButton: {
    marginLeft: 10,
  },
  buttonIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  card: {
    marginTop: 15,
    borderRadius: 16,
    width: width * 0.9,
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
  cardImage: {
    borderRadius: 10,
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
  loadingText: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 20,
  },
});

export default HeaderHome;
