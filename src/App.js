import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddStep from './Components/AddStepModal.js';
import DataGraph from './Components/DataGraph.js';
import CurrentStats from './Components/CurrentStats.js';
import NewUser from './Components/NewUserModal.js';

class App extends Component {
  constructor() {
    super();
    this.retrieveData = this.retrieveData.bind(this);
  }

  retrieveData = async (resolve) => {
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        resolve(JSON.parse(value))
      } else {
        this.props.navigation.navigate('NewUser')
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        <CurrentStats  navigation={this.props.navigation} retrieveData={this.retrieveData} />
        <DataGraph navigation={this.props.navigation} retrieveData={this.retrieveData} />
      </View>
    );
  }
}



const AppNavigator = createStackNavigator(
  {
    Home: App,
    AddStep: AddStep,
    NewUser: NewUser,
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator)