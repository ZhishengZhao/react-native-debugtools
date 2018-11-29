/**
 * 网络日志HTTP部分--日志详情
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Button} from 'react-native';
import px2dp from '../../../libs/px2dp.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logList: []
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerTintColor:'#000',
      headerTitle: (
        <Text style={{ flex: 1, textAlign: 'center', color: '#222222', fontSize: px2dp(18) }}>原生交互日志</Text>
      ),
      // 这里之所以要判断 是因为在生命周期最开始的时候 这个params我们还没给他绑定点击事件
      headerRight: <View><Text onPress={navigation.state.params?navigation.state.params.navigatePress:null}>清空</Text></View>
    }
  };

  _clearStorage = () => {
    global.storage.remove({
      key:'appLog'
    }).then((logs) => {
      console.log('data removed')
      this.setState(previousState => {
        return {
          logList: []
        }
      })
    })
  }

  _getLog() {
    console.log('>>>>>> 开始加载数据')
    global.storage.load({
      key:'appLog'
    }).then((logs) => {
      console.log('>>>>>> 加载数据:', logs)
      this.setState(previousState => {
        return {
          logList: logs //JSON.parse(logs)
        }
      })
      console.log('testData:', logs)
    }).catch((err) => {
      this.setState(previousState => {
        return {
          logList: []
        }
      })
    })
  }
  getInitialState() {
    console.log('stage getInitialState')
  }
  componentWillMount() {
    console.log('stage componentWillMount', this.props.navigation)
  }
  componentDidMount() {
    console.log('stage componentDidMount')
    this._getLog()
    this.props.navigation.setParams({
      navigatePress:this._clearStorage
    })
  }
  shouldComponentUpdate() {
    return true
  }
  componentWillUpdate() {
    console.log('stage componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('stage componentDidUpdate')
  }

  render() {
    console.log('stage render')
    return (
      <View style={styles.page}>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>
          <Text>这里我还没想好怎么去拦截到原生协议的返回内容，好尴尬啊</Text>
          <FlatList
            data={this.state.logList}
            keyExtractor={(item, index) => index + item.url}
            renderItem={({item}) => {
              return <TouchableOpacity onPress={() => this.props.navigation.navigate('debugNetLog_Http_Detail', {data: item})}><View style={styles.item_container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
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
  }
});
