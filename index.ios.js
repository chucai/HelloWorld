/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchPage = require('./SearchPage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
} = React;

var NavigatorComponent = React.createClass({
  render: function(){
    return (
      <Text style={styles.welcome}>
      Hello World! Very Cool!
      </Text>
    );
  }
});

var HelloWorld = React.createClass({
  render: function() {
    return (
      <NavigatorIOS style={styles.container}
        initialRoute={{
          title: 'RubyChina',
          component: SearchPage,
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    marginBottom: 20, 
    fontSize: 18, 
    textAlign: 'center',
    color: '#656565'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 80,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
