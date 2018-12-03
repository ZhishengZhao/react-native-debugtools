/*
* 切换测试环境
*
*/

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { px2dp } from '../utils'
import backBtn from '../common/backBtn'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      envList: []
    };
  }

  static navigationOptions={
    title: '切换测试环境'
  };

  _getEnvList() {
    console.log('>>>>>> 开始加载环境列表数据')
    global.storage.load({
      key:'envList'
    }).then((logs) => {
      this.setState(previousState => {
        return {
          envList: logs
        }
      })
    }).catch((err) => {
      this.setState(previousState => {
        return {
          envList: []
        }
      })
    })
  }
  switchEnv(item) {
    global.storage.save({
      key: 'currentEnv',
      data: item
    }).then(() => {
      console.log('currentEnv-switch:', item)
      // console.log('this.props.navigation', this.props.navigation)
      // 清楚当前环境网络日志
      global.storage.remove({
        key:'netLog'
      }).then((logs) => {
        console.log('data-log removed')
      })
      this.props.navigation.state.params.callback && this.props.navigation.state.params.callback(item)
      this.props.navigation.goBack()
    })
  }
  componentDidMount() {
    this._getEnvList()
  }

  render() {
    return (
      <View style={styles.page}>
        <backBtn/>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>
          <FlatList
            data={this.state.envList}
            keyExtractor={(item, index) => index + item}
            renderItem={({item}) => {
              return <TouchableOpacity onPress={() => this.switchEnv(item)}><View style={styles.item_container}>
                        <Text style={styles.txt_url}>{item}</Text>
                      </View>
                    </TouchableOpacity>
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item_container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: px2dp(5),
    paddingTop: px2dp(5),
    overflow: 'hidden',
    color: '#cccccc',
    borderBottomWidth: px2dp(1),
    borderColor: '#ccc',
  },
  txt_url: {
    fontSize: px2dp(14),
    width: px2dp(375),
    height: px2dp(50),
    lineHeight: px2dp(50),
    textAlign: 'center',
    color: '#4169E1',
  },
});
