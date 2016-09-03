'use strict';

import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} = ReactNative;

class About extends Component {
  render() {
    return (
      <View>
      <TouchableOpacity onPress={() => {
        Linking.openURL('http://www.dicaspresentear.com.br');
      }}>
      <View style={styles.item}> 
        <Text style={styles.title}>Site</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        Linking.openURL('https://www.facebook.com/dicaspresentear/?view_public_for=533096273431810');
      }}>
      <View style={styles.item}>
        <Text style={styles.title}>Facebook</Text>
      </View>
      </TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.subtitle}>contato@dicaspresentear.com.br</Text>
      </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    flex:1,
    height: 50,
    padding: 20,
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    color: 'black'
  },
  subtitle: {
    fontSize: 12,
    color: 'gray'
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

module.exports = About;
