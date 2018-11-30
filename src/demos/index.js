/**
 * 测试demo
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert} from 'react-native';
import { px2dp } from '../utils.js'
import axios from 'axios'
import { restartApp } from '../../index'

export default class App extends Component {
  static navigationOptions={
    headerTintColor:'#000',
    headerTitle: (
      <Text style={{ flex: 1, textAlign: 'center', color: '#222222', fontSize: px2dp(18)}}>调试demo</Text>
    ),
    headerRight: <View/>
  };
  constructor(props) {
    super(props);
    this.state = {
      logsStr: '',
      curEnvirement: 'online'
    };
  }

  _ajaxTest = () => {
    console.log('>>>>>>>>>_ajaxTest')
    axios.get('http://192.168.4.102:9998/mockjs/367/api/banner').then(response => {
      // postPromise('/api/banner', {}).then(response => {
      this.setState(previousState => {
        return {
          responseTip: JSON.stringify(response)
        };
      });
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  _dtSave = () => {
    global.storage.save({
        key: 'netLog',
        data: [123,123,234],
        expires: null
    });
  }

  _dtLoad = () => {
    global.storage.load({
      key:'netLog'
    }).then((logs) => {
      console.log('testData:', logs)
      this.setState(previousState => {
        return {
          logsStr: JSON.stringify(logs)
        }
      })
    }).catch((err) => {
      this.setState(previousState => {
        return {
          logsStr: ''
        }
      })
    })
  }
  _dtDelete = () => {
    global.storage.remove({
      key:'netLog'
    }).then((logs) => {
      console.log('data-log removed')
    })
  }

  _getCurrentEnv() {
    console.log('开始加载当前环境>>>>>>')
    global.storage.load({
      key: 'currentEnv'
    }).then((env) => {
      this.setState(previousState => {
        return {
          curEnvirement: env
        }
      })
    }).catch((err) => {
      console.log('err happened when try to load curEnvirement, detail:', err)
      this.setState(previousState => {
        return {
          curEnvirement: 'online'
        }
      })
    })
  }

  componentDidMount() {
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    // <Button onPress={() => restartApp()} title="重启app" color="#584841"></Button>
    return (
      <View style={styles.page}>
        <Text style={styles.title}>当前测试环境: {this.state.curEnvirement}</Text>
        <Button onPress={() => this._ajaxTest()} title="发送请求测试" color="#158844"></Button>
        <Button onPress={() => this._dtSave()} title="存储测试" color="#841584"></Button>
        <Button onPress={() => this._dtLoad()} title="提取测试" color="#584841"></Button>
        <Button onPress={() => this._dtDelete()} title="清空网络日志存储" color="#584841"></Button>
        <View style={styles.container_bottom}>
          <View style={styles.container_label}>
            <Text style={styles.service_label}>提取测试数据：{this.state.logsStr}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7f7f7',
    paddingTop: px2dp(36)
  },
  title: {
    fontSize: px2dp(18),
    marginBottom: px2dp(18),
  },
  container_bottom: {
    width: px2dp(343),
    minHeight: px2dp(400),
    paddingTop: px2dp(30),
    paddingLeft: px2dp(22),
    paddingRight: px2dp(22),
    backgroundColor: '#fff',
    borderBottomLeftRadius: px2dp(16),
    borderBottomRightRadius: px2dp(16),
  },
  container_label: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: px2dp(331),
    paddingBottom: px2dp(13),
    paddingTop: px2dp(13),
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1
  },
  service_label: {
    width: px2dp(750),
    minHeight: px2dp(400),
    color: '#999',
    fontSize: px2dp(14),
  }
});
