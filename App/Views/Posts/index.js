'use strict';

var React = require('react-native');

var Post = require('../Post');
var styles = require('./styles');

var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} = React;

var Posts =  React.createClass({
  getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    return {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  },

  rowPressed: function(propertyGuid){
    var property = this.props.listings.filter(prop => prop.guid === propertyGuid)[0];
    this.props.navigator.push({
      title: 'Property',
      component: Post,
      passProps: { property: property }
    });
  },

  renderRow: function(rowData, sectionID, rowID){
    var price = rowData.price_formatted.split(' ')[0];
    return (
      <TouchableHighlight underlayColor="#dddddd"
        onPress={()=>this.rowPressed(rowData.guid)}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>£{price}</Text>
              <Text style={styles.title}
              numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
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

module.exports = Posts;