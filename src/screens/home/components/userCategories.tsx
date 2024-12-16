import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { Category } from '../../../interfaces/category.interface';
import useNavigation from '../../../hook/useNavigation';

const { width } = Dimensions.get('screen');

interface CategoryUserProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const CategoryUser: React.FC<CategoryUserProps> = ({ categories, loading, error }) => {
  const navigation = useNavigation();

  const validCategories = categories.filter(item => item.id !== undefined);

  const handleNavigation = (item: Category) => {
    if (item.id) {
      navigation.navigate('BudgetAndTransactionScreen', {
        id: item.id,
        name: item.name,
        description: item.description,
        icon: item.icon,
      });
    }
  };

  const renderCarouselItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => handleNavigation(item)}
    >
      <LinearGradient
        colors={['#2b1557', '#154360']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 2, y: 1 }}
        style={styles.gradientBackground}
      />
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFF" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (validCategories.length === 0) {
    return (
      <View style={styles.noCategoriesContainer}>
        <Text style={styles.noCategoriesText}>
          You don't have any categories yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Categories</Text>
      <Carousel
        loop
        autoFillData
        width={width}
        height={width * 0.25}
        data={validCategories}
        scrollAnimationDuration={800}
        renderItem={renderCarouselItem}
        mode="parallax"
        pagingEnabled
        style={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  itemName: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    width: width * 0.4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noCategoriesContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  noCategoriesText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  icon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  carouselItem: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.95,
    height: 160,
  },
  carousel: {
    marginBottom: 20,
  },
});

export default CategoryUser;
