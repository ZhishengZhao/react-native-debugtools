/*
* 回退按钮
*/

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import px2dp from '../utils.js'

export default class BackBtn extends Component {
  render() {
    return (
      <View style={styles.btn_container}>
        <Text onPress={() => this.props.navigation.goBack()} style={styles.btn_clear}> Back </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn_container: {
    position: 'absolute',
    left: 30,
    bottom: 62,
    width: 55,
    height: 55,
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
  btn_clear: {
    lineHeight: 55,
    fontSize: 18,
    textAlign: 'center',
  },
});
