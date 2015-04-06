# Topic 1: hello world for react-native

@(React)[react-native]

[TOC]


## 简单介绍
包括三个页面: 搜索页面，搜索列表，产品页面。

![Alt text](https://raw.githubusercontent.com/chucai/HelloWorld/master/images/search.png)
![Alt text](https://raw.githubusercontent.com/chucai/HelloWorld/master/images/list.png)
![Alt text](https://raw.githubusercontent.com/chucai/HelloWorld/master/images/post.png)

可以点击 `search`页面的 `Go` 跳到 `List` 页面。
文件的基本目录是:
```
├── App
│   └── Views
│       ├── Post
│       │   ├── index.js
│       │   └── styles.js
│       ├── Posts
│       │   ├── index.js
│       │   └── styles.js
│       └── Search
│           ├── index.js
│           └── styles.js
├── README.md
├── iOS
│   ├── house.png
│   ├── house@2x.png
│   └── house@3x.png
└── index.ios.js

6 directories, 11 files
```
`Search/index.js` 对应的是 搜索页面
`Posts/index.js` 对应的是 列表页面
`Post/index.js` 对应的是产品页面

代码地址是 `https://github.com/chucai/HelloWorld`

## 代码讲解
### 首页
#### 定义一个`Component`并且将其注册为入口程序
```javascript
var HelloWorld = React.createClass({
  render: function() {
    return (
      ...
    );
  }
});

...
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
```
`AppRegistry.registerComponent`的意义是讲`HelloWorld`定为入口`Component`.

当然，在写这些代码之前，必须先引入 `react-native`库
```javascript
'use strict';

var React = require('react-native');
var SearchPage = require('./App/Views/Search');
```
并且将必须得`module`缩写定义好, 比如我们不需要每次都写 `React.StyleSheet` 而可以直接写 `StyleSheet`
```
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
```

在首页我们使用了 `NavigatorIOS` 将 `Search` 包括到首页中
```javascript
render: function() {
    return (
      <NavigatorIOS style={styles.container}
        initialRoute={{
          title: 'RubyChina',
          component: SearchPage,
        }} />
    );
  }
```

### Search 页面
由上面的代码我们可以看到， 我们在首页引入搜索页面的代码非常简单
```javascript
var SearchPage = require('./App/Views/Search');
```
这段代码在实际执行的时候，会去寻找`App/Views/Search/index.js`代码。
本部分代码有一个比较好的实践就是实现了 样式和 `View`代码的分离，我们将 关于 `styles` 的所有代码 放到了` styles.js `页面中。
```
var styles = require("./styles");
```
`Search`代码会比较复杂一点，但总体上结构还是很清晰的。
<b> 需要`button` 和 `输入框`，还有图片</b>
```
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
```
HTML 与  React-native UI 控件对照表
| 描述      |     HTML |   React-native   |
| :-------- | --------:| :------: |
| 输入框    |   text | TextInput  |
| 按钮   |   button | TouchableHighlight  |
| 图片 | img | Image |
<b> 初始化 state 数据
```
 getInitialState: function(){
    return {
      searchString: 'london',
      isLoading: false,
      message: ''
    };
  },
```
<b>需要从服务器端获取数据(实际上，这部分代码应该移到 `Posts`中)</b>
```
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
```
`onSearchPressed` 事件是我们定义在 `Go` 按钮上的点击事件.
```
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4' onPress={this.onSearchPressed}>
            <Text style={styles.buttonText}>
              Go
            </Text>
          </TouchableHighlight>
```
代码中也有如何处理正确和错误的服务器发过来的数据
```
 fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error => {
        this.setState({
          isLoading: false,
          message: 'Something bad happend' + error
        });
      }).done();
```
处理正确的数据
```
.then(response => response.json())
      .then(json => this._handleResponse(json.response))
```
处理错误的数据
```
.catch(error => {
        this.setState({
          isLoading: false,
          message: 'Something bad happend' + error
        });
```
<b> 有一个正在加载的图标</b>
```
var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
         hidden='true'
         size='large' /> ) :
      ( <View/> );
```
<b>  最后，将 `Component` 注册到 `module` 中 </b>
```
module.exports = SearchPage;
```

### 列表页面
主要是展示了如何写一个简单的列表
**先初始化数据源**
```
 getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    return {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  },
```
**然手定义一个 renderRow 的方法**
```
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
```
**最后展示整个列表**
```javascript
  render: function(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow} />
    );
  }
```

## 总结
这个小程序虽然很小，但是包括的内容还是很多的。

1. 有页面直接的跳转，传递参数；
2. 列表展示信息；
3. 展示产品图片信息；
4. 导航栏；
5. 如何优雅的组织代码

在这次练习中，有如下几个方面没有涉及到：

1. 如何调试 react-native 代码
2. 修改等待加载页面
3. 增加一些动态效果
4. 与服务器端程序的交互: 保存数据
5. 应该写一个自动生成代码的工具: 生成 style 和  component
6. 如何打包程序App
7. 没有使用开放的插件
8. 没有测试代码

## 参考
[Introducing React Native: Building Apps with JavaScript](http://www.raywenderlich.com/99473/introducing-react-native-building-apps-javascript?utm_source=javascriptweekly&utm_medium=email)
[HackerNews-React-Native](https://github.com/iSimar/HackerNews-React-Native)