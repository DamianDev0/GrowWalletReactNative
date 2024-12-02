import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import GenericButton from '../../../components/genericButton.component';
import InputGeneric from '../../../components/genericInput.component';

const { width, height } = Dimensions.get('screen');

const WalletForm = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/img/wallet.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Enter your balance</Text>
          <View style={styles.inputContainer}>
            <InputGeneric
              placeholder="Budget"
              value=""
              onChangeText={() => {}}
              icon="wallet"
              width={width * 0.8}
              backgroundColor="rgba(0, 0, 0, 0.3)"
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.buttonContainer}>
            <GenericButton
              title="Next"
              onPress={() => {}}
              backgroundColor="#000000"
              color="#FFFF"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    backgroundColor: '#301338',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  image: {
    width: width * 1.2,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.3)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    flex: 0.5,
    gap: width * 0.08,
  },
  inputContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WalletForm;