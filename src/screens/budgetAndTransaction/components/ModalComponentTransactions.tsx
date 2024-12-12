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
    <GenericModal isVisible={isVisible} onClose={closeModal}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/img/Saly-3.png')}
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
              height={45}
            />
            <InputGeneric
              icon="filetext1"
              placeholder="Description"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={formData.description}
              onChangeText={text => handleChangeInput('description', text)}
              width={310}
              height={45}
            />
            <InputGeneric
              icon="shoppingcart"
              placeholder="Store"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={formData.store}
              onChangeText={text => handleChangeInput('store', text)}
              width={310}
              height={45}
            />
            <InputGeneric
              icon="user"
              placeholder="Name"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={formData.name}
              onChangeText={text => handleChangeInput('name', text)}
              width={310}
              height={45}
            />
          </View>
          <View style={styles.buttonsModal}>
            <GenericButton
              onPress={handleSave}
              title="Save"
              backgroundColor="#000"
              color="#FFFF"
              width={155}
              height={45}
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
    justifyContent: 'flex-start',
  },
  modalImage: {
    width: width * 1.4,
    height: height * 0.34,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  inputsModal: {
    alignItems: 'center',
    gap: width * 0.03,
  },
  buttonsModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default ModalComponentTransactions;
