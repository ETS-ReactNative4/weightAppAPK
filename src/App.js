import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddStep from './Components/AddStepModal.js';
import DataGraph from './Components/DataGraph.js';
import CurrentStats from './Components/CurrentStats.js';
import NewUser from './Components/NewUserModal.js';
import RemoveStep from './Components/RemoveStepModal';

class App extends Component {
  static navigationOptions = {
    title: 'Weight Tracker App',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#111111',
    }
  }
  constructor() {
    super();
    this.retrieveData = this.retrieveData.bind(this);
    this.declareNewUser = this.declareNewUser.bind(this);
    this.state = {
      newUserCheck: false
    }
  }

  declareNewUser() {
    new Promise((resolve, reject) => {
      this.setState({
        newUserCheck: true
      })
      resolve()
    }).then(() => {
      this.props.navigation.navigate('NewUser')
    })
  }

  retrieveData = async (resolve) => {
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        resolve(JSON.parse(value))
      } else {
        this.declareNewUser()
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        <CurrentStats newUserCheck={this.state.newUserCheck} navigation={this.props.navigation} retrieveData={this.retrieveData} />
        <DataGraph navigation={this.props.navigation} retrieveData={this.retrieveData} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    AddStep: AddStep,
    RemoveStep: RemoveStep,
    NewUser: NewUser,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator)