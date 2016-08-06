'use strict';

import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image
} = ReactNative;

class Search extends Component {
  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1, padding: 20, backgroundColor: '#4196cc'}}>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = Search;
