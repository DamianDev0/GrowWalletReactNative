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

const { width, height } = Dimensions.get('screen');

interface HeaderBudgetAndTransactionProps {
  name: string;
  description: string;
  icon: string;
  categoryId: string;
}

const HeaderBudgetAndTransaction: React.FC<HeaderBudgetAndTransactionProps> = ({
  name,
  description,
  icon,
  categoryId,
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
  } = useTransaction();

  return (
    <View style={styles.content}>
      <View style={styles.iconButtonsContainer}>
        <TouchableOpacity onPress={openBudgetModal} style={styles.iconButton}>
          <Feather name="dollar-sign" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openTransactionModal}
          style={styles.iconButton}>
          <Feather name="activity" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: icon }} style={styles.icon} />
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: width * 1,
    position: 'relative',
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
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 10,
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
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    width: width * 0.9,
  },
});

export default HeaderBudgetAndTransaction;
