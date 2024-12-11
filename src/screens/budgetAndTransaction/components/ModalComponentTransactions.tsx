import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import GenericModal from '../../../components/modal.component';
import InputGeneric from '../../../components/genericInput.component';
import GenericButton from '../../../components/genericButton.component';
import useTransaction from '../hooks/useTransactions';

const {width, height} = Dimensions.get('screen');

interface ModalComponentTransactionsProps {
  isVisible: boolean;
  closeModal: () => void;
  budgetId: string;
}

const ModalComponentTransactions: React.FC<ModalComponentTransactionsProps> = ({
  isVisible,
  closeModal,
  budgetId,
}) => {
  const {formData, handleChangeInput, handleSave} = useTransaction(budgetId);

  return (
    <GenericModal
      isVisible={isVisible}
      onClose={closeModal}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/img/Saly-33.png')}
              style={styles.modalImage}
            />
          </View>
          <View style={styles.inputsModal}>
            <InputGeneric
              icon="wallet"
              placeholder="Amount"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              keyboardType="decimal-pad"
              value={formData.amount}
              onChangeText={text => handleChangeInput('amount', text)}
              width={310}
            />
            <InputGeneric
              icon="filetext1"
              placeholder="Description"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={formData.description}
              onChangeText={text => handleChangeInput('description', text)}
              width={310}
            />
            <InputGeneric
              icon="shoppingcart"
              placeholder="Store"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={formData.store}
              onChangeText={text => handleChangeInput('store', text)}
              width={310}
            />
            <InputGeneric
              icon="user"
              placeholder="Name"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={formData.name}
              onChangeText={text => handleChangeInput('name', text)}
              width={310}
            />
          </View>
          <View style={styles.buttonsModal}>
            <GenericButton
              onPress={closeModal}
              title="Close"
              backgroundColor="#000"
              color="#FFFF"
              width={165}
            />
            <GenericButton
              onPress={handleSave}
              title="Save"
              backgroundColor="#000"
              color="#FFFF"
              width={165}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GenericModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  modalImage: {
    width: width * 1.3,
    height: height * 0.35,
    resizeMode: 'contain',
  },
  inputsModal: {
    alignItems: 'center',
    gap: width * 0.03,
  },
  buttonsModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalComponentTransactions;
