import React from 'react';
import {TextInput, StyleSheet, TextInputProps, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  height?: number;
  width?: number;
  color?: string;
  marginBottom?: number;
  opacity?: number;
  icon?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const InputGeneric: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  height = 50,
  width = 350,
  marginBottom,
  opacity = 1,
  icon,
  keyboardType,
  secureTextEntry,
  backgroundColor = '#FFF',
  textColor = '#FFF',
}) => {
  return (
    <View
      style={[
        styles.inputContainer,
        {height, width, marginBottom, backgroundColor, opacity},
      ]}>
      {icon && <Icon name={icon} size={23} color="#FFF" style={styles.icon} />}
      <TextInput
        style={[styles.input, {color: textColor}]}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
  },
});

export default InputGeneric;
