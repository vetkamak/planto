import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class CreateNewReportScreen extends Component {

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
    var authorName = this.props.userItem.user.userName + ' ' + this.props.userItem.user.userSurname;
    this.state = {
      user: this.props.userItem.key,
      authorName: authorName,
      date: null,
      projectName: '',
      completedTasks: '',
      plannedTasks: '',
    };

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  render() {
    return(
      <ScrollView style={styles.container}>

        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white'}}>
          <Image source={require('../images/user.png')} style={styles.imageStyle}/>
          <Text style={{fontSize: 14, marginLeft: 15}}>Report from: {this.state.authorName}</Text>
        </View>

        <TouchableOpacity onPress={this._onDatePressed.bind(this)}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../images/date.png')} style={styles.imageStyle}/>
              <Text style={{fontSize: 14, marginLeft: 15, color: this.state.date ? 'black' : 'silver' }}>Date: {this._formattedDate() ? this._formattedDate() : ''}</Text>
            </View>
            <Image source={require('../images/accessoryArrow.png')} style={{height: 15, width: 8, marginRight: 20}}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onProjectPressed.bind(this)}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../images/project.png')} style={styles.imageStyle}/>
              <Text style={{fontSize: 14, marginLeft: 15, color: this.state.projectName ? 'black' : 'silver' }}>Project name: {this.state.projectName}</Text>
            </View>
            <Image source={require('../images/accessoryArrow.png')} style={{height: 15, width: 8, marginRight: 20}}/>
          </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white'}}>
          <Image source={require('../images/completed.png')} style={styles.imageStyle}/>
          <TextInput
            multiline={true}
            placeholder='Completed tasks'
            value={this.state.completedTasks}
            onChangeText={(text) => this.setState({ completedTasks: text })}
            style={styles.textInputStyle}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 3, backgroundColor: 'white'}}>
          <Image source={require('../images/planned.png')} style={styles.imageStyle}/>
          <TextInput
            multiline={true}
            placeholder='Planned tasks'
            value={this.state.plannedTasks}
            onChangeText={(text) => this.setState({ plannedTasks: text })}
            style={styles.textInputStyle}
          />
        </View>

        <TouchableOpacity onPress={this._onCreateNewReportPressed.bind(this)}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: '#967adc', height: 50, width: 300, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginVertical: 15}}>
              <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>Create Report</Text>
            </View>
          </View>
        </TouchableOpacity>
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

  _onDatePressed() {
    this.props.navigator.showLightBox({
      screen: 'Planto.DatePickerLightBox',
      style: {
        backgroundBlur: 'none',
        backgroundColor: '#00000070',
        tapBackgroundToDismiss: true,
      },
      passProps:{
        callbackFromParent: this._datePickerCallback,
        onClose: this._dismissLightBox
      }
    });
  }

  _datePickerCallback = (date) => {
    this.setState({
      date: date,
    });
  }

  _formattedDate() {
    if (this.state.date) {
      var d = this.state.date;
      var month = d.getMonth() + 1;
      var date = d.getDate();
      var year = d.getFullYear();
      return date + '.' + month + '.' + year;
    } else return '';
  }

  _onProjectPressed() {
    this.props.navigator.showLightBox({
      screen: 'Planto.ProjectsListLightBox',
      style: {
        backgroundBlur: 'none',
        backgroundColor: '#00000070',
        tapBackgroundToDismiss: true,
      },
      passProps: {
        callbackFromParent: this._projectsCallback,
        onClose: this._dismissLightBox
      }
    });
  }

  _projectsCallback = (projectName) => {
    this.setState({
      projectName: projectName,
    });
  }

  _dismissLightBox = () => {
    this.props.navigator.dismissLightBox();
  }

  _validateData() {
    if (this.state.user && this.state.authorName && this.state.date && this.state.projectName && this.state.completedTasks && this.state.plannedTasks) {
      return true;
    } else {
      return false;
    }
  }

  _onCreateNewReportPressed() {
    if (this._validateData()) {
      var newReportKey = firebase.database().ref().child('reports').push().key;
      var reportData = {
        userKey: this.state.user,
        authorName: this.state.authorName,
        date: this.state.date,
        projectName: this.state.projectName,
        completed: this.state.completedTasks,
        planned: this.state.plannedTasks,
      }

      firebase.database().ref('/reports/' + newReportKey).set(reportData);

      firebase.database().ref('/users/' + this.state.user + '/userReports/' + newReportKey).set(true);

      this._popBackToMenu();
    } else {
      Alert.alert('Empty fields!','Please, fill out all fields with required information!');
    }
  }

  _popBackToMenu() {
    this.props.navigator.popToRoot();
    this.props.navigator.switchToTab({
      tabIndex: 1,
    });
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
