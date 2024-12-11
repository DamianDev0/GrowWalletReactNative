import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import GenericModal from '../../../components/modal.component';
import InputGeneric from '../../../components/genericInput.component';
import GenericButton from '../../../components/genericButton.component';
import GenericDropdown from '../../../components/GenericDropdown';
import useBudget from '../hooks/useBudget';

const {width, height} = Dimensions.get('screen');

interface ModalComponentBudgetProps {
  isVisible: boolean;
  closeModal: () => void;
  categoryId: string;
}

const ModalComponentBudget: React.FC<ModalComponentBudgetProps> = ({
  isVisible,
  closeModal,
  categoryId,
}) => {
  const {handleSave, selectedValue, setSelectedValue, amount, setAmount} =
    useBudget(categoryId);

  const dropdownData = [
    {label: 'Monthly', value: 'MONTHLY'},
    {label: 'Biweekly', value: 'BIWEEKLY'},
  ];

  return (
    <GenericModal
      isVisible={isVisible}
      onClose={closeModal}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
        style={styles.container}>
        <Image
          source={require('../../../assets/img/Saly-38.png')}
          style={styles.modalImage}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputsModal}>
            <InputGeneric
              icon="wallet"
              placeholder="Budget"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={amount}
              onChangeText={setAmount}
            />
            <GenericDropdown
              data={dropdownData}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              placeholder="Select period"
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
    flex: 0.9,
    justifyContent: 'center',
  },
  modalImage: {
    width: width * 0.9,
    height: height * 0.35,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 30,
  },
  inputsModal: {
    gap: width * 0.01,
  },
});

export default ModalComponentBudget;
