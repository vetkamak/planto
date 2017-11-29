import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class ViewReportScreen extends Component {

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../images/backArrow.png'),
        id: 'backButton',
        buttonFontSize: 16,
        buttonFontWeight: '600',
      },
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white'}}>
          <Image source={require('../images/user.png')} style={styles.imageStyle}/>
          <Text style={{fontSize: 14, marginLeft: 15}}>Report from: {this.props.reportItem.authorName}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../images/date.png')} style={styles.imageStyle}/>
            <Text style={{fontSize: 14, marginLeft: 15}}>Date: {this._formattedDate(this.props.reportItem.date)}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../images/project.png')} style={styles.imageStyle}/>
            <Text style={{fontSize: 14, marginLeft: 15}}>Project name: {this.props.reportItem.projectName}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white'}}>
          <Image source={require('../images/completed.png')} style={styles.imageStyle}/>
          <TextInput
            multiline={true}
            editable={false}
            value={this.props.reportItem.completed}
            style={styles.textInputStyle}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white'}}>
          <Image source={require('../images/planned.png')} style={styles.imageStyle}/>
          <TextInput
            multiline={true}
            editable={false}
            value={this.props.reportItem.planned}
            style={styles.textInputStyle}
          />
        </View>
      </ScrollView>
    );
  }

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop();
      }
    }
  }

  _formattedDate(dateObj) {
    var d = new Date(dateObj);
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    return date + '.' + month + '.' + year;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f8',
  },
  imageStyle: {
    marginLeft: 20,
    marginVertical: 10,
    width: 30,
    height: 30,
  },
  textInputStyle: {
    flex: 1,
    margin: 15,
  }
});
