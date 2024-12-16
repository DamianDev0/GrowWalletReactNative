import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import BottomSheet from '../../../components/modal.component';
import InputGeneric from '../../../components/genericInput.component';
import useCategoriesModal from '../hooks/useCategoriesModal';
import GenericDropdown from '../../../components/GenericDropdown';
import GenericButton from '../../../components/genericButton.component';
import {dropdownData} from '../../../constants/dataDropDownUserCreate';

const {width, height} = Dimensions.get('screen');

interface ModalUserCreateCategoriesProps {
  isVisible: boolean;
  closeModal: () => void;
}

const ModalUserCreateCategories: React.FC<ModalUserCreateCategoriesProps> = ({
  isVisible,
  closeModal,
}) => {
  const {form, handleChange, handleSave, selectedValue, setSelectedValue} =
    useCategoriesModal();

  return (
    <View style={styles.container}>
      <BottomSheet isVisible={isVisible} onClose={closeModal}>
        <Image
          source={require('../../../assets/img/Saly-32.png')}
          style={styles.image}
        />
        <View style={styles.dropdown}>
          <GenericDropdown
            data={dropdownData}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            placeholder="Select icon"
          />
        </View>
        <InputGeneric
          placeholder="Name"
          value={form.name}
          onChangeText={text => handleChange('name', text)}
          marginBottom={10}
          backgroundColor="rgba(0, 0, 0, 0.3)"
        />
        <InputGeneric
          placeholder="Description"
          value={form.description}
          onChangeText={text => handleChange('description', text)}
          backgroundColor="rgba(0, 0, 0, 0.3)"
        />

        <GenericButton
          title="Save"
          onPress={() => {
            handleSave();
            closeModal();
          }}
          backgroundColor="#000"
          color="#FFFF"
          width={150}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.5,
    height: height * 0.3,
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 20,
  },
});

export default ModalUserCreateCategories;
