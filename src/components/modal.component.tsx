import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

type AnimationType =
  | 'slideInUp'
  | 'slideOutDown'
  | 'bounce'
  | 'flash'
  | 'jello'
  | 'pulse'
  | 'rotate'
  | 'rubberBand'
  | 'shake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInUp'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInUp'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutUp'
  | undefined;

type GenericModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  animationIn?: AnimationType;
  animationOut?: AnimationType;
};

const GenericModal: React.FC<GenericModalProps> = ({
  isVisible,
  onClose,
  children,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={animationIn}
      animationOut={animationOut}
      backdropOpacity={0.5}
      style={styles.modal}>
      {/* LinearGradient envuelve el modal */}
      <LinearGradient
        colors={['#000000', '#6a1b9a', '#000000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientContainer}>
        <View style={styles.content}>{children}</View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GenericModal;
