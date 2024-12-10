import React, {useCallback, useRef, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import useTransactions from '../hooks/useTransactions';
import {DataItem} from '../../../interfaces/transaction.interface';

const {width, height} = Dimensions.get('screen');

const Transactions = () => {
  const {transactions, loading, error} = useTransactions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState<number>(2);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []); // Ajustamos el snapPoint a 90% para que ocupe más

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(sheetIndex === 0 ? 0 : 1, {duration: 300}),
      transform: [
        {scale: withTiming(sheetIndex === 0 ? 0.9 : 1, {duration: 300})},
      ],
    };
  });

  const renderItem = ({item}: {item: DataItem}) => (
    <View style={styles.item}>
      <View style={styles.containerCard}>
        <Image source={{uri: item.category.icon}} style={styles.icon} />
        <View style={styles.descriptionAndDate}>
          <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.textDate}>{item.description}</Text>
          <Text style={styles.textDate}>{item.date}</Text>
        </View>
        <View>
          <Text style={styles.textAmount}>${item.amount}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error || !transactions.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error ? 'No transactions available.' : 'No transactions available.'}
        </Text>
        <Image
          source={require('../../../assets/img/Saly-45.png')}
          style={styles.emptyImage}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.titleTransaction}>Transactions</Text>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}  // Este valor ahora es más grande
        onChange={handleSheetChanges}
        backgroundStyle={styles.bottomSheetBackground}
        index={2}
        handleIndicatorStyle={styles.handleIndicator}>
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          <BottomSheetFlatList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.bottomSheetContainer}
          />
        </Animated.View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetContainer: {
    flexGrow: 1.6,
    padding: 16,
    backgroundColor: 'transparent',
  },
  animatedContainer: {
    flex: 1,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(229, 155, 233, 0.1)',
  },
  containerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.07,
    padding: 10,
  },
  bottomSheetBackground: {
    backgroundColor: 'transparent',
  },
  handleIndicator: {
    backgroundColor: 'white',
    width: 40,
    height: 4,
    borderRadius: 3,
  },
  descriptionAndDate: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    width: width * 0.23,
  },
  textDate: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
  },
  textAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    marginTop: 8,
    marginHorizontal: -20,
  },
  loading: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: width * 0.8,
    height: height * 0.25,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 60,
    fontWeight: 'bold',
  },
  titleTransaction: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
  },
});

export default Transactions;
