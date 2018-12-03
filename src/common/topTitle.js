/*
* 页内标题
*/

import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import px2dp from '../utils.js';

export default class TopTitle extends Component {
  render() {
    return (
      <Text style={styles.txt_title}> {this.props.content} </Text>
    );
  }
}

const styles = StyleSheet.create({
  txt_title: {
    textAlign: 'center',
    lineHeight: px2dp(50),
    fontSize: px2dp(18),
    paddingTop: px2dp(10),
  },
});
