/**
 * 网络日志HTTP部分--日志详情
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { px2dp } from '../utils.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: {}
    };
  }

  static navigationOptions={
    headerTintColor:'#000',
    headerTitle: (
      <Text style={{ flex: 1, textAlign: 'center', color: '#222222', fontSize: px2dp(18)}}>日志详情</Text>
    ),
    headerRight: <View/>
  };
  _initLogInfo() {
    this.setState(previousState => {
      return {
        log: this.props.navigation.state.params.data
      };
    });
  }

  componentDidMount() {
    console.log('stage componentDidMount')
    this._initLogInfo()
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>
          <Text style={styles.txt_url}>请求地址：{this.state.log.url}</Text>
          <Text>入参：{this.state.log.data}</Text>
          <Text>请求头：{this.state.log.requestHeaders}</Text>
          <Text>响应头：{this.state.log.responseHeaders}</Text>
          <Text>响应体：{JSON.stringify(this.state.log.response)}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txt_url: {

  }
});
