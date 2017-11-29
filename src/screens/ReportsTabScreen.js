import React, { Component } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firebase from 'react-native-firebase';

import ReportCell from '../components/ReportCell';

export default class ReportsTabScreen extends Component {

  static navigatorStyle = {
    navBarBackgroundColor: '#e9573f',
    navBarTextColor: '#ffffff',
    navBarSubtitleTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    navBarNoBorder: true,
  };

  constructor(props) {
    super(props);
    this.reportsRef = null;
    this.state = {
      reportsSections: [],
      searchResults: [],
    };
  }

  componentDidMount() {
    this.reportsRef = firebase.database().ref('reports');
    this.reportsRef.on('value', this._onReportsUpdate.bind(this));
  }

  componentWillUnmount() {
    if (this.reportsRef) {
      this.reportsRef.off('value', this._onReportsUpdate);
    }
  }

  _onReportsUpdate(snapshot) {
    const value = snapshot.val() || {};
    const keys = Object.keys(value);
    const sections = {};

    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      const report = value[key];

      var reportDate = this._dateInString(report.date);
      if (!sections[reportDate]) {
        sections[reportDate] = {
          title: reportDate,
          key: report.date,
          data: [],
        }
      }

      const data = Object.assign({ key }, report);
      if (!sections[reportDate].data.length) {
        sections[reportDate].data.push(data);
      } else {
        const previousDate = sections[reportDate].data[sections[reportDate].data.length -1].date;
        if (previousDate < data.date) sections[reportDate].data.unshift(data);
        else sections[reportDate].data.push(data);
      }
    }

    this.setState({
      reportsSections: Object.values(sections).sort((a, b) => a.key > b.key).reverse(),
      searchResults: Object.values(sections).sort((a, b) => a.key > b.key).reverse(),
    });
  }

  _dateInString(dateObj) {
    var d = new Date(dateObj);
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    return date + '.' + month + '.' + year;
  }

  _renderSectionItem = ({ item }) => {
    const onPress = () => this._onReportCellPressed(item);
    return(
      <TouchableOpacity onPress={onPress}>
        <View>
          <ReportCell
            userName={item.authorName}
            projectName={item.projectName}
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

  _renderSectionHeader = ({ section }) => {
    return(
      <Text style={styles.sectionHeader}>{section.title}</Text>
    );
  }

  render() {
    return (
      <SectionList
        sections={this.state.reportsSections}
        renderItem={this._renderSectionItem}
        renderSectionHeader={this._renderSectionHeader}
        keyExtractor={item => item.key}
        style={styles.container}
      />
    );
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
