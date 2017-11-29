import React, { Component } from 'react';
import {
  View,
  Text,
  DatePickerIOS,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class DatePickerLightBox extends Component {

  static navigatorButtons = {
    leftButtons: [{
      title: 'Dismiss',
      id: 'dismissButton'
    }],
    rightButtons: [
      {
        title: 'Select',
        id: 'selectDate'
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this._closeButtonPressed()}>
            <Image source={require('../images/close.png')} style={styles.imageStyle}/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Date</Text>
          <TouchableOpacity onPress={() => this._acceptButtonPressed()}>
            <Image source={require('../images/accept.png')} style={styles.imageStyle}/>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <DatePickerIOS
            mode='date'
            date={this.state.date}
            onDateChange={(date) => this.setState({ date })}
          />
        </View>
      </View>
    );
  }

  _closeButtonPressed() {
    this.props.onClose();
  }

  _acceptButtonPressed() {
    this.props.callbackFromParent(this.state.date);
    this.props.onClose();
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: width*0.9,
    height: height*0.5,
    borderRadius: 20,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  imageStyle: {
    marginHorizontal: 20,
    marginTop: 20,
    width: 35,
    height: 35,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
});
