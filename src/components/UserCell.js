import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

export default class UserCell extends Component {

  onPress() {
    const { item, onPress } = this.props;
    onPress(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          {this.props.userName} {this.props.userSurname}
        </Text>
        <Image source={require('../images/accessoryArrow.png')} style={{height: 15, width: 8, marginRight: 20}}/>
      </View>
    );
  }
}

UserCell.propTypes = {
  userName: PropTypes.string.isRequired,
  userSurname: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
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
