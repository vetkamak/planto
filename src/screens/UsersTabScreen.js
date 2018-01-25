import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
} from 'react-native';
import firebase from 'react-native-firebase';

import UserCell from '../components/UserCell';

var OutputVolume = NativeModules.OutputVolume;
OutputVolume.get();

export default class UsersTabScreen extends Component {

  static navigatorStyle = {
    navBarBackgroundColor: '#e9573f',
    navBarTextColor: '#ffffff',
    navBarSubtitleTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    navBarNoBorder: true,
    tabBarBackgroundColor: '#ffffff',
    tabBarButtonColor: '#e9573f',
    tabBarSelectedButtonColor: '#e9573f',
    tabBarTranslucent: false,
  };

  constructor(props) {
    super(props);
    this.usersRef = null;
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.usersRef = firebase.database().ref('users');
    this.usersRef.on('value', this._onUsersUpdate.bind(this));
  }

  componentWillUnmount() {
    if (this.usersRef) {
      this.usersRef.off('value', this._onUsersUpdate);
    }
  }

  _onUsersUpdate(snapshot) {
    const value = snapshot.val() || {};
    const keys = Object.keys(value);
    var users = [];

    for (let i = 0, len = keys.length; i < len; i ++) {
      var key = keys[i];
      var user = value[key];
      var data = {
        key: key,
        user: user,
      };
      users.push(data);
    }
    this.setState({ users: users });
  }

  _renderUserItem = (userItem) => {
    const onPress = () => this._onUserCellPressed(userItem);
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <UserCell
            userName={userItem.user.userName}
            userSurname={userItem.user.userSurname}
            onPress={onPress}
          />
        </View>
      </TouchableOpacity>
    );
  }

  _onUserCellPressed(userItem) {
    var title = userItem.user.userName + ' ' +  userItem.user.userSurname;
    this.props.navigator.push({
      title: title,
      screen: 'Planto.UserMenuScreen',
      passProps: {
        userItem: userItem
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.users}
          renderItem={({item}) => this._renderUserItem(item)}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f8',
  },
});
