/**
 * 网络日志HTTP部分--日志详情
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Button} from 'react-native';
import { px2dp } from '../../utils.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logList: []
    };
  }
  static navigationOptions={
    title: '网络日志',
  };

  _clearLogStorage = () => {
    global.storage.remove({
      key:'netLog'
    }).then((logs) => {
      console.log('data removed')
      this.setState(previousState => {
        return {
          logList: []
        }
      })

      this.props.navigation.goBack()
    })
  }

  _initLogList() {
    console.log('>>>>>> 开始加载数据')
    global.storage.load({
      key:'netLog'
    }).then((logs) => {
      console.log('>>>>>> 加载数据:', logs)
      this.setState(previousState => {
        return {
          logList: logs
        }
      })
    }).catch((err) => {
      this.setState(previousState => {
        return {
          logList: []
        }
      })
    })
  }

  componentDidMount() {
    console.log('stage componentDidMount')
    this._initLogList()
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>
          <FlatList
            data={this.state.logList}
            keyExtractor={(item, index) => index + item.url}
            renderItem={({item}) => {
              return <TouchableOpacity onPress={() => this.props.navigation.navigate('DebugLogHttpDetail', {data: item})}><View style={styles.item_container}>
                        <Text style={styles.txt_url}>{item.url}</Text>
                        <View style={styles.hor_txts}>
                          <Text>Method: {item.protocol}</Text>
                          <Text>{item.creatTime}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
            }}
          />
        </ScrollView>
        <Text onPress={() => this._clearLogStorage()} style={styles.btn_clear}> Clear </Text>
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
    width: px2dp(750),
    height: px2dp(20),
    color: '#4169E1',
  },
  hor_txts: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn_clear: {
    position: 'absolute',
    right: 30,
    bottom: 160,
    width: 60,
    height: 60,
    lineHeight: 60,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#ccc',
    borderRadius: 50,
  }
});
