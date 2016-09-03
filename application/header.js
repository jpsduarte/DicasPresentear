'use strict';

import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image
} = ReactNative;

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={{width: 24, height: 24, marginRight: 5}} />
        <Text style={styles.title}>Dicas Presentear</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    height: 60,
    padding: 20,
    backgroundColor: '#FF6B6B'
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

module.exports = Header;
