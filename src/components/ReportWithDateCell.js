import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ReportWithDateCell extends Component {

  onPress() {
    const { item, onPress } = this.props;
    onPress(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grayView}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>{this._dateInString(this.props.reportDate)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={{fontSize: 16, fontWeight: '600', marginLeft: 20, marginVertical: 5}}>
              {this.props.projectName}
            </Text>
            <Text style={styles.textStyle}>
              {this.props.userName}
            </Text>
          </View>
          <View>
            <Image source={require('../images/accessoryArrow.png')} style={{height: 15, width: 8, marginHorizontal: 20}}/>
          </View>
        </View>
      </View>
    );
  }

  _dateInString(dateObj) {
    var d = new Date(dateObj);
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    return date + '.' + month + '.' + year;
  }

}

ReportWithDateCell.propTypes = {
  projectName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  reportDate: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 3,
  },
  grayView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aab2bd90',
  },
  infoContainer: {
    flex: 7,
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
  },
});
