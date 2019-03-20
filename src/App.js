import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddStep from './Components/AddStepModal.js';
import DataGraph from './Components/DataGraph.js';
import AddStepButton from './Components/AddStepButton.js';
import CurrentStats from './Components/CurrentStats.js';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        <CurrentStats />
        <AddStepButton navigation={this.props.navigation} />
        <DataGraph navigation={this.props.navigation} retrieveData={retrieveData}/>
      </View>
    );
  }
}

const retrieveData = async (resolve) => {
  try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
          resolve(JSON.parse(value))
      }
  } catch (error) {
      console.log(error)
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