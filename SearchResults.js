'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} = React;

var SearchResults =  React.createClass({
  getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    return {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  },

  renderRow: function(rowData, sectionID, rowID){
    return (
      <TouchableHighlight
        underlayColor="#dddddd">
        <View>
          <Text> {rowData.title} </Text>
        </View>
      </TouchableHighlight>
    );
  },

  render: function(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow} />
    );
  }

});

module.exports = SearchResults;