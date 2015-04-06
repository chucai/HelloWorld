'use strict';

var React = require('react-native');
var SearchResults = require('../Posts');
var styles = require("./styles");

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} = React;

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  // return 'http://api.nestoria.co.uk/api?' + querystring;
  return 'http://rpm.fw.tv:8000/1.json';
};

var SearchPage = React.createClass({
  getInitialState: function(){
    return {
      searchString: 'london',
      isLoading: false,
      message: ''
    };
  },

  onSearchTextChanged: function(event){
    console.log("onSearchTextChanged");
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  },

  onSearchPressed: function(event){
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  },

  _executeQuery: function(query){
    console.log(query);
    this.setState({isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error => {
        this.setState({
          isLoading: false,
          message: 'Something bad happend' + error
        });
      }).done();
  },

  _handleResponse: function(response){
    this.setState({isLoading: false, message: ''});
    if (response.application_response_code.substr(0, 1) === '1'){
      console.log('properties found: ' + response.listings.length);
      this.props.navigator.push({
        title: 'Result',
        component: SearchResults,
        passProps: { listings: response.listings }
      });
    } else {
      this.setState({message: 'Location not recognized; please try again'});
    }
  },

  render: function(){
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
         hidden='true'
         size='large' /> ) :
      ( <View/> );
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
           Search for houses to buy!
        </Text>
        <Text style={styles.description}>
           Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged}
            placeholder='Search via name or postcode'/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4' onPress={this.onSearchPressed}>
            <Text style={styles.buttonText}>
              Go
            </Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>
            Location
          </Text>
        </TouchableHighlight>
        <Image source={require('image!house')}
          style={styles.image} />
        {spinner}
        <Text style={styles.description}>
          {this.state.message}
        </Text>
      </View>
    );
  }
});

module.exports = SearchPage;
