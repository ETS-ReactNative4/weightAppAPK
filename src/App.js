import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MyToolbar from './Components/MyToolbar.js';
import AddStep from './Components/AddStepModal.js';
import MainPage from './Components/MainPage.js';
import LogIn from './Components/LogInModal';

class App extends Component {
  render() {
    return (
      <View>
        <MyToolbar navigation={this.props.navigation}/>
        <MainPage />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    AddStep: AddStep,
    LogIn: LogIn
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator)