/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid
} from 'react-native';

class application extends Component {
  render() {

    var navigationView = (
       <View style={{flex: 1, backgroundColor: '#fff'}}>
         <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Im in the Drawer!</Text>
       </View>
     );
     return (
       <DrawerLayoutAndroid
         drawerWidth={300}
         drawerPosition={DrawerLayoutAndroid.positions.Left}
         renderNavigationView={() => navigationView}>
         <View style={{flex: 1, alignItems: 'center'}}>
           <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
           <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
         </View>
       </DrawerLayoutAndroid>
     );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('application', () => application);
