import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ReportCell extends Component {

  onPress() {
    const { item, onPress } = this.props;
    onPress(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.redLine}>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{fontSize: 16, fontWeight: '600', marginLeft: 20}}>
            {this.props.projectName}
          </Text>
          <View style={{flexDirection: 'row'}}>
          <Text style={styles.textStyle}>
            {this.props.userName}
          </Text>
          <Image source={require('../images/accessoryArrow.png')} style={{height: 15, width: 8, marginHorizontal: 20}}/>
          </View>
        </View>
      </View>
    );
  }
}

ReportCell.propTypes = {
  projectName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 3,
  },
  redLine: {
    height: 50,
    width: 8,
    backgroundColor: '#fc6e5199',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
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
