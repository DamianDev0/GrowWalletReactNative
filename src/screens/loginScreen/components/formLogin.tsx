import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GenericButton from '../../../components/genericButton.component';
import InputGeneric from '../../../components/genericInput.component';
import useRegister from '../hooks/useLogin';
import {CustomToast} from '../../../components/toastMessage.component';

const LoginForm: React.FC = () => {
  const {
    formData,
    handleChange,
    handleLogin,
    errorMessage,
    loading,
    handleSignUpNavigation,
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
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <InputGeneric
        placeholder="Email"
        value={formData.email}
        onChangeText={value => handleChange('email', value)}
        keyboardType="email-address"
        icon="mail"
      />
      <InputGeneric
        placeholder="Password"
        value={formData.password}
        onChangeText={value => handleChange('password', value)}
        secureTextEntry
        icon="lock"
      />
      <GenericButton
        title={loading ? 'Loading...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      <Text style={styles.loginText} onPress={handleSignUpNavigation}>
        Already have an account? Log in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
