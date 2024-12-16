import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import GenericButton from '../../../components/genericButton.component';
import InputGeneric from '../../../components/genericInput.component';
import useRegister from '../hooks/useRegister';
import {CustomToast} from '../../../components/toastMessage.component';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const RegisterForm: React.FC = () => {
  const {
    formData,
    handleChange,
    handleRegister,
    loading,
    handleLoginNavigation,
    errorMessage,
  } = useRegister();

  useEffect(() => {
    if (errorMessage) {
      CustomToast({
        type: 'error',
        text1: 'Registration Error',
        text2: errorMessage,
      });
    }
  }, [errorMessage]);

  return (
    <LinearGradient
      colors={['#000000', '#6a1b9a', '#000000']}
      start={{x: 2, y: 0}}
      end={{x: 0, y: 5}}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/img/Saly-16.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.titleLoginForm}>Register</Text>
            <View style={styles.containerInput}>
              <InputGeneric
                placeholder="Name"
                value={formData.name}
                onChangeText={value => handleChange('name', value)}
                icon="person-outline"
                width={width * 0.8}
                backgroundColor="rgba(0, 0, 0, 0.3)"
              />
              <InputGeneric
                placeholder="Email"
                value={formData.email}
                onChangeText={value => handleChange('email', value)}
                keyboardType="email-address"
                icon="mail-outline"
                width={width * 0.8}
                backgroundColor="rgba(0, 0, 0, 0.3)"
              />
              <InputGeneric
                placeholder="Password"
                value={formData.password}
                onChangeText={value => handleChange('password', value)}
                secureTextEntry
                icon="lock-closed-outline"
                width={width * 0.8}
                backgroundColor="rgba(0, 0, 0, 0.3)"
              />
            </View>
            <View style={styles.registerButton}>
              <GenericButton
                title={loading ? 'Loading...' : 'Register'}
                onPress={handleRegister}
                disabled={loading}
                backgroundColor="#000000"
                color="#FFFF"
              />
            </View>
            <Text style={styles.registerText} onPress={handleLoginNavigation}>
              Already have an account?{' '}
              <Text style={styles.titleLogin}>Log in </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
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
  },
  image: {
    width: width * 1.3,
    height: height * 0.46,
    resizeMode: 'contain',
  },
  containerInput: {
    alignItems: 'center',
    gap: 17,
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.3)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width * 1,
    height: height * 0.45,
  },
  titleLoginForm: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 11,
  },
  titleLogin: {
    color: '#000',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterForm;
