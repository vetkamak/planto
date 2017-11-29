import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';

import ProjectCell from '../components/ProjectCell';

const { width, height } = Dimensions.get('window');

export default class ProjectsListLightBox extends Component {

  constructor(props) {
    super(props);
    this.projectsRef = null;
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    this.projectsRef = firebase.database().ref('projects');
    this.projectsRef.on('value', this._onProjectsUpdate.bind(this));
  }

  componentWillUnmount() {
    if (this.projectsRef) {
      this.projectsRef.off('value', this._onProjectsUpdate);
    }
  }

  _onProjectsUpdate(snapshot) {
    const value = snapshot.val() || {};
    const keys = Object.keys(value);
    var projects = [];

    for (let i = 0, len = keys.length; i < len; i ++) {
      var key = keys[i];
      var project = value[key].projectName;
      var data = {
        key: key,
        projectName: project,
      };
      projects.push(data);
    }
    this.setState({ projects: projects});
  }

  _renderProjectItem = (projectName) => {
    const onPress = () => this._onProjectCellPressed(projectName);
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <ProjectCell
            projectName={projectName}
            onPress={onPress}
          />
        </View>
      </TouchableOpacity>
    );
  }

  _onProjectCellPressed(projectName) {
    this.props.callbackFromParent(projectName);
    this.props.onClose();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this._closeButtonPressed()}>
            <Image source={require('../images/close.png')} style={styles.imageStyle}/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Projects</Text>
          <View style={{backgroundColor: 'transparent', width: 35, marginHorizontal: 20}}></View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.projects}
            renderItem={({item}) => this._renderProjectItem(item.projectName)}
            keyExtractor={item => item.key}
            style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 15}}
          />
        </View>
      </View>
    );
  }

  _closeButtonPressed() {
    this.props.onClose();
  }

}

const styles = StyleSheet.create({
  container: {
    width: width*0.9,
    height: height*0.5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  listText: {
    fontSize: 20
  }
});
