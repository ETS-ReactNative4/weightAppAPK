import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddStep from './Components/AddStepModal.js';
import DataGraph from './Components/DataGraph.js';
import AddStepButton from './Components/AddStepButton.js';

class App extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor: '#111111'}}>
        <AddStepButton navigation={this.props.navigation} />
        <DataGraph navigation={this.props.navigation} />
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