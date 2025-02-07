import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import RecipesCard from './RecipesCard';
import Loading from '../loading/Loading';
import {useNavigation} from '@react-navigation/native';
import { bg, disActiveBg, regular } from '../colors';

const Recipes = ({meals, data, isLoadingNext, refetch, loadNext, ITEM_CNT}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textRecipe}>Recipes</Text>
      </View>
      <View>
        {data.length == 0 || meals.length == 0 ? (
          <Loading size={40} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={item => item.idMeal} // Use idMeal as the unique key
            numColumns={2} // Number of columns in the grid
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <RecipesCard recipe={item} navigation={navigation} />
            )} // Pass recipe data to RecipesCard
            refreshing={isLoadingNext} // Pull-to-refresh loading state
            onRefresh={() => refetch({first: ITEM_CNT})} // Refetch data on pull-to-refresh
            onEndReachedThreshold={0.1} // Load more when reaching the bottom
            onEndReached={() => loadNext(ITEM_CNT)} // Load next set of items
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  textContainer: {
    paddingLeft: 10,
  },
  textRecipe: {
    fontSize: 30,
    fontWeight: '900',
    color: regular, // Text color
  },
});
