import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ProjectCell extends Component {

  onPress() {
    const { item, onPress } = this.props;
    onPress(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          {this.props.projectName}
        </Text>
      </View>
    );
  }
}

ProjectCell.propTypes = {
  projectName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 1,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 14,
    marginLeft: 20
  },
});
