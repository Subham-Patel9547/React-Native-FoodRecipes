import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {bg, cardShadow, regular} from '../colors';

const RecipesCard = ({recipe, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipesDetails', {...recipe})}>
      <Image
        source={{uri: recipe.strMealThumb}}
        style={[styles.image, {height: Math.random() * 80 + 200}]}
        resizeMode="cover"
      />

      <Text style={styles.title}>
        {recipe.strMeal.length > 20
          ? recipe.strMeal.slice(0, 20) + '...'
          : recipe.strMeal}
      </Text>
    </TouchableOpacity>
  );
};

export default RecipesCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: bg,
    elevation: 5,
    shadowColor: cardShadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    color: regular,
    textAlign: 'center',
  },
});
