import React from 'react';
import { Platform, View } from 'react-native';
import RNRestart from 'react-native-restart';
import { AsyncStorage, StyleSheet } from 'react-native';
import Storage from 'react-native-storage';
import RootSiblings from 'react-native-root-siblings';
import ActionButton from 'react-native-action-button';
import { start as enableXHRInterceptor } from './src/utils'
// 项目路由
import debugIndex from './src/demos/index'; //调试目录
import envSwitch from './src/env_switch/index'; //切换环境
import logHttp from './src/netlog/index'; // 网络日志列表
import logHttpDetail from './src/netlog/detail'; // 网络日志详情

// 创建新的存储实例
var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
})
// 全局变量
global.storage = storage
global.currentEnv = ''
// 初始化
export const initDTs = (options) => {
  if (!options.envList) {
    console.log('初始化参数异常：环境变量options.envList为空')
    return
  }
  // 初始化环境列表存储
  initEnvListStore(options.envList)

  // 初始化当前环境变量
  initCurrentEnvStore(options.envList[0])

  // 启动xhr拦截记录器
  enableXHRInterceptor(options.blackList)
}

const initEnvListStore = (envList) => {
  // 直接存储吧，直接覆盖掉
  storage.save({
    key: 'envList',
    data: envList
  })
}

const initCurrentEnvStore = (defaultEnv) => {
  storage.load({
    key: 'currentEnv'
  }).then((env) => {
    console.log('currentEnv-load:', env)
    global.currentEnv = env
  }).catch(() => {
    console.log('currentEnv-load-null:')
    storage.save({
      key: 'currentEnv',
      data: defaultEnv
    }).then(() => {
      global.currentEnv = defaultEnv
    })
  })
}
// 导出debug工具路由
export const debugRoute = {
  DebugDemos: { screen: debugIndex },
  DebugEnvSwitch: { screen: envSwitch },
  DebugLogHttp: { screen: logHttp },
  DebugLogHttpDetail: { screen: logHttpDetail },
}
// 重启app方法
export const restartApp = () => {
  RNRestart.Restart()
}
// 导出storage给全局global对西那个覆盖不到的地方使用
export const storage = storage

// 初始化生成浮动按钮
const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      position: 'absolute',
      right: 0,
      bottom: 145,
      width: 175,
      height: 5,
      overflow: 'visible',
    },
    android: {
      position: 'absolute',
      right: 0,
      bottom: 30,
      width: 375,
      height: 520,
    }
  }),
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  actionButtonText: {
    fontSize: 14,
    color: 'white',
  }
});
export const generateDebugBtn = (navigation, envSwitchCallBack) => {
  const _goPage = (page) => {
    if (page === 'DebugEnvSwitch') {
      navigation.navigate('DebugEnvSwitch', {
        callback: envSwitchCallBack
      })
    } else {
      navigation.navigate(page)
    }
  }

  let sibling = new RootSiblings(<View style={styles.container}>
    <ActionButton buttonColor="rgba(231,76,60,1)" position='right' verticalOrientation='up'>
      <ActionButton.Item buttonColor='#9b59b6' title="切换环境" onPress={() => {_goPage('DebugEnvSwitch')}}>
        <Text style={styles.actionButtonIcon}>Env</Text>
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#3498db' title="网络日志" onPress={() => {_goPage('DebugLogHttp')}}>
        <Text style={styles.actionButtonIcon}>Net</Text>
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#1abc9c' title="其他测试" onPress={() => {_goPage('DebugDemos')}}>
        <Text style={styles.actionButtonIcon}>Ops</Text>
      </ActionButton.Item>
    </ActionButton>
  </View>)
}

// 获取当前环境
export const getCurrentEnv = () => {
  storage.load({
    key: 'currentEnv'
  }).then((env) => {
    return env
  }).catch(() => {
    return ''
  })
}
