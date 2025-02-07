import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { activeBg, activeText, disActiveBg, disActiveText } from '../colors';

const Categories = ({data, activeCategories, handleChangeCategorie}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {data.map((item, index) => {
          const isActive = item.strCategory === activeCategories; // Check if the category is active
          const a = isActive ? activeBg : disActiveBg;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.touchAbleButton,
                // Apply active button style conditionally
              ]}
              onPress={() => handleChangeCategorie(item.strCategory)}>
              <View
                style={[
                  styles.circularView,
                  {backgroundColor: a},
                  // Apply active circle style conditionally
                ]}>
                <Image
                  source={{uri: item.strCategoryThumb}}
                  style={styles.image}
                />
              </View>
              <Text
                style={[
                  styles.text,
                  isActive && styles.activeText, // Apply active text style conditionally
                ]}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  touchAbleButton: {
    alignItems: 'center',
    padding: 10,
  },
  circularView: {
    borderRadius: wp(100),
  },
  image: {
    width: wp(12), 
    height: wp(12),
    margin: 5,
    borderRadius: wp(6),
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: disActiveText,
    textAlign: 'center',
  },
  activeText: {
    color: activeText, // Highlighted text color
    fontWeight: 'bold',
  },
});
