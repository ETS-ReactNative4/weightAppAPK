import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddStep from './Components/AddStepModal.js';
import MainPage from './Components/MainPage.js';

class App extends Component {
  render() {
    return (
      <View>
        <MainPage />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    AddStep: AddStep,
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator)