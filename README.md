<<<<<<< HEAD
# react-native-debugtools
RN app端调试工具
=======

# react-native-react-native-debugtools

## Getting started

`$ npm install react-native-react-native-debugtools --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-debugtools`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-debugtools` and add `RNReactNativeDebugtools.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeDebugtools.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeDebugtoolsPackage;` to the imports at the top of the file
  - Add `new RNReactNativeDebugtoolsPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-debugtools'
  	project(':react-native-react-native-debugtools').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-debugtools/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-debugtools')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNReactNativeDebugtools.sln` in `node_modules/react-native-react-native-debugtools/windows/RNReactNativeDebugtools.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using React.Native.Debugtools.RNReactNativeDebugtools;` to the usings at the top of the file
  - Add `new RNReactNativeDebugtoolsPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNReactNativeDebugtools from 'react-native-react-native-debugtools';

// TODO: What to do with the module?
RNReactNativeDebugtools;
```
  
>>>>>>> initialize
