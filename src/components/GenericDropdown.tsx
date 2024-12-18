import React from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const {width, height} = Dimensions.get('screen');

interface GenericDropdownProps {
  data: {label?: string; value: string; iconUrl?: string}[];
  selectedValue: string | null;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder?: string;
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  data,
  selectedValue,
  setSelectedValue,
  placeholder = 'Select',
}) => {
  return (
    <View style={styles.dropdownContainer}>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValue}
        onChange={item => setSelectedValue(item.value)}
        style={styles.dropdown}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.selectedText}
        iconColor="#fff"
        renderItem={item => (
          <View style={styles.dropdownItem}>
            {item.iconUrl && (
              <Image source={{uri: item.iconUrl}} style={styles.dropdownItemImage} />
            )}
            <Text style={styles.dropdownItemText}>{item.label}</Text>
          </View>
        )}
        containerStyle={styles.dropdownContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 20,
    width: width * 0.89,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  selectedText: {
    color: '#fff',
  },
  dropdownContainerStyle: {
    backgroundColor: '#000',
    borderColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemImage: {
    width: width * 0.1,
    height: height * 0.06,
    marginRight: 10,
  },
  dropdownItemText: {
    color: '#fff',
    flex: 1,
    textAlign: 'left',
  },
});

export default GenericDropdown;
