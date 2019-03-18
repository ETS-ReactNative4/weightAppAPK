import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  DatePickerAndroid,
  StyleSheet
} from 'react-native';

export default class AddStep extends Component {
  constructor() {
    super();
    this.showDatePicker = this.showDatePicker.bind(this);
    this.state = {
      modalVisible: true,
      pickedDate: '',
      weightText: ''
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          pickedDate: `${month + 1}/${day}`
        })
        console.log(this.state.pickedDate)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Text>Add Weight</Text>
        <TextInput style={styles.weightInput}
          onChangeText={(weightText) => this.setState({ weightText })}
          value={this.state.weightText}
        />
        <TouchableHighlight
          onPress={this.showDatePicker}>
          <Text>Add Date</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weightInput: {
    height: 40,
    borderColor: 'gray'
  }
})