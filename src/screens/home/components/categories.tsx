import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import useCategories from '../hooks/useCategories';
import useNavigation from '../../../hook/useNavigation';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const Categories = () => {
  const {categories, error, loading} = useCategories();
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id || ''}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('BudgetAndTransactionScreen', {
                id: item.id ?? '',
                name: item.name,
                description: item.description,
                icon: item.icon,
              })
            }>
            <LinearGradient
              colors={['#2b1557', '#000']}
              start={{x: 1, y: 0}}
              end={{x: 1, y: 2}}
              style={styles.gradientBackground}
            />
            <Image source={{uri: item.icon}} style={styles.icon} />
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.24,
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.4,
    height: height * 0.09,
    elevation: 1,
    shadowColor: '#FFFF',

    position: 'relative',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  itemName: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
    width: width * 0.4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    width: 47,
    height: 47,
    resizeMode: 'contain',
  },
});

export default Categories;
