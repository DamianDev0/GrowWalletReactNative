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
    <BottomSheet isVisible={isVisible} onClose={closeModal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Image
            source={require('../../../assets/img/Saly-22.png')}
            style={styles.modalImage}
          />
          <View style={styles.inputsModal}>
            <InputGeneric
              icon="wallet"
              placeholder="Budget"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
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
              width={150}
              height={45}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    gap: width * 0.4,
  },
  modalImage: {
    width: width * 0.9,
    height: height * 0.36,
    resizeMode: 'contain',

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    overflow: 'hidden',
    gap: width * 0.09,
  },
  inputsModal: {
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonsModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default ModalComponentBudget;
