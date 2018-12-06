import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor';
import { Dimensions } from 'react-native';
const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375;

export function px2dp(px) {
    return px * deviceW / basePx;
}

export function start(blackList) {
  // 这个暂时延后一下
  // if (blackList && !(blackList instanceof Array)) {
  //   console.log('白名单参数异常。此参数选填，且为字符串数组格式')
  //   return
  // }
  // console.log('XHRInterceptor', XHRInterceptor)
  const defaultMessage = {
    requestHeaders: {},
    responseHeaders: {},
  };

  let message = defaultMessage;

  XHRInterceptor.setOpenCallback((protocol, url) => {
    message.protocol = protocol;
    message.url = url;
  });

  XHRInterceptor.setSendCallback((d) => {
    try {
      message.data = convertURLStringToHash(d);
    } catch (e) {
      if (d) {
        message.data = d;
      }
    }
  });
  XHRInterceptor.setRequestHeaderCallback((header, value) => {
    message.requestHeaders[header] = value;
    message.creatTime = new Date().toLocaleDateString()
  });
  XHRInterceptor.setHeaderReceivedCallback((header, value) => {
    message.responseHeaders[header] = value;
  });
  XHRInterceptor.setResponseCallback((status, _, payload) => {
    message.status = status
    message.response = payload || '{}';
    message.requestHeaders = message.requestHeaders;
    message.responseHeaders = message.responseHeaders;
    // console.log('>>>>>> 请求拦截成功，拦截内容：', message)
    let tempMessage = message
    global.storage.load({
      key: 'netLog'
    }).then((logs) => {
      // console.log('历史存取数据：', logs)
      logs = logs || []
      logs.push(tempMessage)
      global.storage.save({
        key: 'netLog',
        data: logs 
      })
    }).catch((err) => {
      global.storage.save({
        key: 'netLog',
        data: [tempMessage] 
      })
    });
    message = defaultMessage;
  });

  XHRInterceptor.enableInterception();
}

export function stop() {
  XHRInterceptor.disableInterception();
}




