import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomSheet from '../../../components/modal.component';
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
    <BottomSheet isVisible={isVisible} onClose={closeModal} height={600}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
        style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/img/Saly-22.png')}
            style={styles.modalImage}
          />
          <View style={styles.inputsModal}>
            <InputGeneric
              icon="wallet-outline"
              placeholder="Budget"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              height={50}
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
              onPress={handleSave}
              title="Save"
              backgroundColor="#000"
              color="#FFFF"
              width={250}
              height={45}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  modalImage: {
    width: width * 0.9,
    height: height * 0.36,
    resizeMode: 'contain',
  },
  inputsModal: {
    width: width,
    alignItems: 'center',
    gap: 5,
  },
  buttonsModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default ModalComponentBudget;
