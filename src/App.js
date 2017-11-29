import { Navigation } from 'react-native-navigation';

import UsersTabScreen from './screens/UsersTabScreen';
import ReportsTabScreen from './screens/ReportsTabScreen';
import UserMenuScreen from './screens/UserMenuScreen';
import CreateNewReportScreen from './screens/CreateNewReportScreen';
import DatePickerLightBox from './screens/DatePickerLightBox';
import ProjectsListLightBox from './screens/ProjectsListLightBox';
import ViewReportScreen from './screens/ViewReportScreen';
import ReportsListScreen from './screens/ReportsListScreen';

registerTabAppScreens = () => {
  Navigation.registerComponent('Planto.UsersTabScreen', () => UsersTabScreen);
  Navigation.registerComponent('Planto.ReportsTabScreen', () => ReportsTabScreen);
  Navigation.registerComponent('Planto.UserMenuScreen', () => UserMenuScreen);
  Navigation.registerComponent('Planto.CreateNewReportScreen', () => CreateNewReportScreen);
  Navigation.registerComponent('Planto.DatePickerLightBox', () => DatePickerLightBox);
  Navigation.registerComponent('Planto.ProjectsListLightBox', () => ProjectsListLightBox);
  Navigation.registerComponent('Planto.ViewReportScreen', () => ViewReportScreen);
  Navigation.registerComponent('Planto.ReportsListScreen', () => ReportsListScreen);
}

startTabBasedApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Employees',
        screen: 'Planto.UsersTabScreen',
        icon: require('./images/usersTab.png'),
        selectedIcon: require('./images/usersTab.png'),
        title: 'Employees'
      },
      {
        label: 'Reports',
        screen: 'Planto.ReportsTabScreen',
        icon: require('./images/reportsTab.png'),
        selectedIcon: require('./images/reportsTab.png'),
        title: 'Reports'
      }
    ],
    tabStyle: {
      tabBarBackgroundColor: '#ffffff',
      tabBarButtonColor: '#e9573f',
      tabBarSelectedButtonColor: '#e9573f',
      tabBarTranslucent: false,
    },
    appStyle: {
      orientation: 'portrait'
    },
  });
}

registerTabAppScreens();
startTabBasedApp();
