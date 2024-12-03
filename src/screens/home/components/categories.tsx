import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import useCategories from '../hooks/useCategories';

const {width, height} = Dimensions.get('screen');
const Categories = () => {
  const {categories, error, loading} = useCategories();

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
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: item.icon}} style={styles.icon} />
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: 'rgba(229, 155, 233, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.5,
    height: height * 0.1,
    shadowColor: '#E59BE9',
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
    fontSize: 16,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Categories;
