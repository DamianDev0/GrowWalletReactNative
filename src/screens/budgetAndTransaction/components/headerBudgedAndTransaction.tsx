import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import useBudget from '../hooks/useBudget';
import ModalComponentBudget from './ModalComponentBudget';
import ModalComponentTransactions from './ModalComponentTransactions';
import useTransaction from '../hooks/useTransactions';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

interface HeaderBudgetAndTransactionProps {
  name: string;
  description: string;
  icon: string;
  categoryId: string;
  budgetId: string;
}

const HeaderBudgetAndTransaction: React.FC<HeaderBudgetAndTransactionProps> = ({
  name,
  description,
  icon,
  categoryId,
  budgetId,
}) => {
  const {
    isVisible: isBudgetVisible,
    openModal: openBudgetModal,
    closeModal: closeBudgetModal,
  } = useBudget(categoryId);
  const {
    isVisible: isTransactionVisible,
    openModal: openTransactionModal,
    closeModal: closeTransactionModal,
  } = useTransaction(budgetId);

  return (
    <LinearGradient
      colors={['#2b1557', '#000']}
      start={{x: 2, y: 1.8}}
      end={{x: 0, y: 3.6}}
      style={styles.content}>
      <View style={styles.iconButtonsContainer}>
        <TouchableOpacity
          onPress={openBudgetModal}
          style={styles.iconButtonContainer}>
          <View style={styles.iconButton}>
            <Feather name="dollar-sign" size={24} color="#fff" />
          </View>
          <Text style={styles.iconButtonText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openTransactionModal}
          style={styles.iconButtonContainer}>
          <View style={styles.iconButton}>
            <Feather name="activity" size={24} color="#fff" />
          </View>
          <Text style={styles.iconButtonText}>Transaction</Text>
        </TouchableOpacity>
      </View>

      <Image source={{uri: icon}} style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      <ModalComponentBudget
        isVisible={isBudgetVisible}
        closeModal={closeBudgetModal}
        categoryId={categoryId}
      />
      <ModalComponentTransactions
        isVisible={isTransactionVisible}
        closeModal={closeTransactionModal}
        budgetId={budgetId}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: width * 1,
    position: 'relative',
    shadowColor: '#ffff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  iconButtonsContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButtonContainer: {
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'rgba( 133, 193, 233,0.4)',
    borderRadius: 20,
    padding: 10,
  },
  iconButtonText: {
    marginTop: 5,
    fontSize: 10,
    color: '#ccc',
    fontWeight: 'bold',
  },
  icon: {
    width: width * 0.4,
    height: height * 0.13,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255,0.8)',
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    width: width * 0.9,
    color: 'rgba(255, 255, 255,0.6)',
  },
});

export default HeaderBudgetAndTransaction;
