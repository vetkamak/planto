import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class UserMenuScreen extends Component {

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../images/backArrow.png'),
        id: 'backButton',
        buttonFontSize: 14,
        buttonFontWeight: '600',
      },
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onUserReportsPressed.bind(this)}>
          <View style={styles.menuCellContainer}>
            <Text style={styles.textStyle}>
              User reports
            </Text>
            <Image source={require('../images/accessoryArrow.png')} style={{height: 15, width: 8, marginRight: 20}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onNewReportPressed.bind(this)}>
          <View style={styles.menuCellContainer}>
            <Text style={styles.textStyle}>
              Create new report
            </Text>
            <Image source={require('../images/accessoryArrow.png')} style={{height: 15, width: 8, marginRight: 20}}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop();
      }
    }
  }

  _onUserReportsPressed() {
    this.props.navigator.push({
      screen: 'Planto.ReportsListScreen',
      title: 'User Reports',
      passProps: {
        userItem: this.props.userItem,
      }
    });
  }

  _onNewReportPressed() {
    this.props.navigator.push({
      screen: 'Planto.CreateNewReportScreen',
      title: 'New Report',
      passProps: {
        userItem: this.props.userItem
      },
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f8',
  },
  menuCellContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 1,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 14,
    marginLeft: 20
  },
});
