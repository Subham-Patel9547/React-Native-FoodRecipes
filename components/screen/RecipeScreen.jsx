import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/AntDesign';
import Loading from '../loading/Loading';
import WebView from 'react-native-webview';
import {
  bg,
  error,
  heartbg,
  primary,
  regular,
  secondaryRegular,
} from '../colors';

const RecipeScreen = props => {
  const item = props.route.params;
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(null);
  const [meal, setMeal] = useState(null);

  const fetchMealsRecipe = async id => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await response.json();
      if (data && data.meals) {
        setMeal(data.meals[0]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealsRecipe(item.idMeal);
  }, []);

  const ingreditemsIndexs = meal => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i] && meal['strIngredient' + i].trim()) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60}}
      style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={{uri: item.strMealThumb}} style={styles.image} />
      </View>

      <View style={styles.buttonContainer}>
        {/* back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Icons name="left" size={hp(3.5)} color={primary} strokeWidth={4.5} />
        </TouchableOpacity>
        {/* heart fav.. */}
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.button}>
          <Icons
            name="heart"
            size={hp(3.5)}
            color={isFavorite ? heartbg : secondaryRegular}
          />
        </TouchableOpacity>
      </View>
      {/* Recipe Details */}
      {loading ? (
        <Loading size={40} />
      ) : meal ? (
        <View style={styles.recipeContainer}>
          <View>
            <Text style={styles.strMealText}>{meal.strMeal}</Text>
            <Text style={styles.categoryText}>
              Category: {meal.strCategory}
            </Text>
            <Text style={styles.areaText}>Cuisine: {meal.strArea}</Text>
          </View>
          <Text style={styles.instructionsTitle}>Ingredients</Text>

          {/* Ingredients */}
          {ingreditemsIndexs(meal).map(i => {
            return (
              <View key={i} style={{flexDirection: 'row', paddingVertical: 5}}>
                {/* Circle */}
                <View style={styles.solidCircle} />
                {/* Ingredient & Measurement */}
                <View style={styles.ingredientMeasurementContainer}>
                  <Text style={styles.strMeasureText}>
                    {meal['strMeasure' + i]}
                  </Text>
                  <Text style={styles.strIngredient}>
                    {meal['strIngredient' + i]}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Instructions */}
          <View>
            <Text style={styles.instructionsTitle}>Instructions</Text>
            <View>
              <Text style={styles.instructions}>{meal.strInstructions}</Text>
            </View>
          </View>

          {/* recipe Video */}
          {meal.strYoutube && (
            <View style={styles.youtubeVideoContainer}>
              <Text style={styles.recipeVideoText}>Watch Recipe Tutorial:</Text>
              <View>
                <WebView
                  source={{uri: meal.strYoutube}}
                  style={{height: hp(25)}}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.errorText}>Unable to load meal details.</Text>
      )}
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: bg,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: wp(98),
    height: hp(50),
    borderRadius: 40,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    marginTop: 10,
  },
  buttonContainer: {
    width: wp('100%'),
    padding: 14,
    marginTop: 20,
    position: 'absolute',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: wp(1),
    borderRadius: 50,
    backgroundColor: bg,
  },

  recipeContainer: {
    padding: 10,
  },
  strMealText: {
    fontWeight: 'bold',
    color: primary,
    fontSize: 22,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 18,
    color: regular,
  },
  areaText: {
    fontSize: 18,
    color: regular,
    marginBottom: 8,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  instructions: {
    fontSize: 16,
    color: regular,
    lineHeight: 22,
    marginTop: 6,
  },

  solidCircle: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: primary,
  },

  ingredientMeasurementContainer: {
    marginLeft: 15,
    marginTop: -3,
    flexDirection: 'row',
    gap: 2,
  },
  strMeasureText: {
    fontWeight: '800',
    fontSize: wp(4.4),
  },

  strIngredient: {
    fontWeight: 600,
    marginTop: 5,
  },

  youtubeVideoContainer: {
    marginTop: 20,
  },
  recipeVideoText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  errorText: {
    fontSize: 18,
    color: error,
    textAlign: 'center',
    marginTop: 20,
  },
});
