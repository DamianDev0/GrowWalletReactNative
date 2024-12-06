import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import GenericModal from '../../../components/modal.component';
import InputGeneric from '../../../components/genericInput.component';
import GenericButton from '../../../components/genericButton.component';

const {width, height} = Dimensions.get('screen');

interface ModalComponentTransactionsProps {
  isVisible: boolean;
  closeModal: () => void;
}

const ModalComponentTransactions: React.FC<ModalComponentTransactionsProps> = ({
  isVisible,
  closeModal,
}) => {
  return (
    <GenericModal
      isVisible={isVisible}
      onClose={closeModal}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <Image
        source={require('../../../assets/img/Saly-33.png')}
        style={styles.modalImage}
      />
      <View style={styles.inputsModal}>
        <InputGeneric
          icon="wallet"
          placeholder="Amount"
          backgroundColor="rgba(0, 0, 0, 0.3)"
        />
        <InputGeneric
          icon="filetext1"
          placeholder="Description"
          backgroundColor="rgba(0, 0, 0, 0.3)"
        />
        <InputGeneric
          icon="shoppingcart"
          placeholder="Store"
          backgroundColor="rgba(0, 0, 0, 0.3)"
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
          title="Save"
          backgroundColor="#000"
          color="#FFFF"
          width={165}
        />
      </View>
    </GenericModal>
  );
};

const styles = StyleSheet.create({
  modalImage: {
    width: width * 1,
    height: height * 0.41,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  buttonsModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  inputsModal: {
    gap: width * 0.03,
  },
});

export default ModalComponentTransactions;
