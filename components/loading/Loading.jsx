import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import { primary } from '../colors';

const Loading = props => {
  return (
    <View style={{marginTop:10}}>
      <ActivityIndicator {...props} size={50} color={primary}/>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
