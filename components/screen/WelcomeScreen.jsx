import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {innerCircleBg, outerCircleBg, welcomeBg, welcomeText} from '../colors';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <Image
            source={require('../../images/s.jpg')}
            style={styles.logoStyle}
          />
        </View>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.titleTextStyle}>Foody</Text>
        <Text style={styles.foodyRightText}>Food Is Already Right</Text>
      </View>
      <View style={styles.persionalInfo}>
        <Text style={styles.persionalInfoText}>Subham Patel | 7266896432</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: welcomeBg,
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    padding: wp('10%'),
    backgroundColor: outerCircleBg,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    padding: wp('10%'),
    backgroundColor: innerCircleBg,
  },
  logoStyle: {
    height: hp('20%'),
    width: hp('20%'),
    borderRadius: hp('10%'),
  },
  textWrapper: {
    marginTop: hp('3%'),
    alignItems: 'center',
  },
  titleTextStyle: {
    color: welcomeText,
    fontSize: wp('18%'),
    fontWeight: '800',
  },
  foodyRightText: {
    color: welcomeText,
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },

  persionalInfo: {
    position: 'absolute',
    bottom: 5,
  },
  persionalInfoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
});
