import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firebase from 'react-native-firebase';

import ReportWithDateCell from '../components/ReportWithDateCell';

export default class ReportsListScreen extends Component {

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
    this.userReportsRef = null;
    this.state = {
      userReports: [],
    };
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.userReportsRef = firebase.database().ref('/users/' + this.props.userItem.key + '/userReports/');
    this.userReportsRef.on('value',
  this._onGetUserReports.bind(this));
  }

  componentWillUnmount() {
    if (this.userReportsRef) {
      this.userReportsRef.off('value', this._onGetUserReports);
    }
  }

  _onGetUserReports(snapshot) {
    snapshot.forEach( (report) => {
      if (report.val() == true) {
        firebase.database().ref('/reports/' + report.key).once('value', this._onGetReport);
      }
    });
  }

  _onGetReport = (reportSnapshot) => {
    var reports = this.state.userReports;
    var key = reportSnapshot.key;
    var report = reportSnapshot.val();
    var data = {
      key: key,
      report: report,
    };
    reports.push(data);

    if (this.userReportsRef) {
      this.setState({
        userReports: Object.values(reports).sort((a,b) => a.report.date > b.report.date).reverse(),
      });
    }

  }

  _renderReportItem = ({ item }) => {
    const onPress = () => this._onReportCellPressed(item.report);
    return(
      <TouchableOpacity onPress={onPress}>
        <View>
          <ReportWithDateCell
            userName={item.report.authorName}
            projectName={item.report.projectName}
            reportDate={item.report.date}
          />
        </View>
      </TouchableOpacity>
    );
  }

  _onReportCellPressed = (reportItem) => {
    this.props.navigator.push({
      title: 'Report',
      screen: 'Planto.ViewReportScreen',
      passProps: {
        reportItem: reportItem,
      }
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.userReports}
        renderItem={this._renderReportItem}
        keyExtractor={item => item.key}
        style={styles.container}
      />
    );
  }

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'backButton') {
        this.props.navigator.pop();
      }
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f8',
  },
  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#e3e3e3'
  },
});
