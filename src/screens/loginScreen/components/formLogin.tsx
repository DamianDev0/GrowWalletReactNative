import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GenericButton from '../../../components/genericButton.component';
import InputGeneric from '../../../components/genericInput.component';
import useLogin from '../hooks/useLogin';
import {CustomToast} from '../../../components/toastMessage.component';

const {width, height} = Dimensions.get('screen');

const LoginForm: React.FC = () => {
  const {
    formData,
    handleChange,
    handleLogin,
    errorMessage,
    loading,
    handleSignUpNavigation,
  } = useLogin();

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
              source={require('../../../assets/img/Saly-35.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.titleLoginForm}>Login</Text>
            <View style={styles.containerInput}>
              <InputGeneric
                placeholder="Email"
                value={formData.email}
                onChangeText={value => handleChange('email', value)}
                keyboardType="email-address"
                icon="mail"
                width={width * 0.8}
                backgroundColor="rgba(0, 0, 0, 0.3)"
              />
              <InputGeneric
                placeholder="Password"
                value={formData.password}
                onChangeText={value => handleChange('password', value)}
                secureTextEntry
                icon="lock"
                width={width * 0.8}
                backgroundColor="rgba(0, 0, 0, 0.3)"
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.loginButton}>
              <GenericButton
                title={loading ? 'Loading...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
                backgroundColor="#000000"
                color="#FFFF"
              />
            </View>
            <Text style={styles.loginText} onPress={handleSignUpNavigation}>
              Already have an account?{' '}
              <Text style={styles.titleLogin}>Sign Up</Text>
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
    marginTop: height * 0.05,
  },
  image: {
    width: width * 1.3,
    height: height * 0.45,
    resizeMode: 'contain',
  },
  containerInput: {
    alignItems: 'center',
    gap: 25,
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.2)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width * 1,
    height: height * 0.41,
    shadowColor: '#000',
  },

  forgotPasswordText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 11,
    marginHorizontal: 20,
  },
  titleLoginForm: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
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

export default LoginForm;
