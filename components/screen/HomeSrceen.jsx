import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/AntDesign';
import Categories from '../categorie/Categories';
import Loading from '../loading/Loading';
import Recipes from '../recipes/Recipes';
import {bg, greetingHighlight, inputBg, secondaryRegular} from '../colors';

const HomeSrceen = () => {
  const [data, setData] = useState([]); // categories
  const [meals, setMeals] = useState([]); // meals
  const [activeCategories, setActiveCategories] = useState('Beef');
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategories) {
      fetchMeals(activeCategories);
    }
  }, [activeCategories]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://themealdb.com/api/json/v1/1/categories.php',
      );
      const result = await response.json();
      setData(result.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMeals = async (category = 'Vegetarian') => {
    try {
      setLoading(true);
      const responseMeals = await fetch(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      const resultMeals = await responseMeals.json();
      setMeals(resultMeals.meals);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setLoading(false);
    }
  };

  const handleChangeCategorie = category => {
    setMeals([]); // Reset meals when category changes
    setActiveCategories(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        style={styles.scrollView}>
        {/* Headers */}
        <View style={styles.headers}>
          <Image
            source={require('../../images/s.jpg')}
            style={styles.userIconStyle}
          />
          <Icons name="bells" size={wp(7)} color="gray" />
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.userName}>Hello, Subh..</Text>
          <Text style={styles.subtitle}>Make Your Own Food,</Text>
          <Text style={[styles.subtitle, {marginTop: -10}]}>
            Stay At <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View>
          <TextInput
            placeholder="search any recipe"
            placeholderTextColor={'black'}
            style={styles.TextInput}
          />
          <View style={styles.seacrchContainer}>
            <TouchableOpacity>
              <Text>
                <Icons name="search1" size={wp(7)} color="gray" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View>
          <Categories
            data={data}
            activeCategories={activeCategories}
            handleChangeCategorie={handleChangeCategorie}
          />
        </View>

        {/* Recipes */}
        <View>
          {loading ? <Loading /> : <Recipes meals={meals} data={data} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeSrceen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: bg,
  },

  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  userIconStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  greetingContainer: {
    flex: 1,
    marginHorizontal: 10,
    margin: 8,
  },
  userName: {
    fontSize: hp(1.7),
    fontWeight: 'bold',
    color: secondaryRegular,
  },
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: '900',
  },
  highlight: {
    color: greetingHighlight,
    fontWeight: 'bold',
  },
  TextInput: {
    height: hp(5),
    borderRadius: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontSize: wp(4.5),
    backgroundColor: inputBg,
  },
  seacrchContainer: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: bg,
    position: 'absolute',
    right: 12,
    top: 3,
  },
});
