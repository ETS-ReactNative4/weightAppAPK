import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  DatePickerAndroid,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class AddStep extends Component {
  constructor() {
    super();
    this.showDatePicker = this.showDatePicker.bind(this);
    this.submitData = this.submitData.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.saveData = this.saveData.bind(this);
    this.getData = this.getData.bind(this);
    this.resetStack = this.resetStack.bind(this);
    this.state = {
      modalVisible: true,
      pickedDate: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
      weightText: '',
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
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  submitData() {
    if (!this.state.weightText) {
      return alert('Weight cannot be blank')
    } else {
      new Promise((resolve, reject) => {
        this.getData(resolve);
      }).then((result) => {
        console.log('reslemlsmd', result)
        this.saveData(result);
        this.resetStack()
      })
    }
  }

  resetStack() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  getData = async (resolve) => {
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        console.log('valuevalue: ', JSON.parse(value));
        resolve(JSON.parse(value));
      }
    } catch (error) {
      console.log('1', error);
      alert('Error saving data.')
    }
  }

  saveData = async (data) => {
    console.log('data', data);
    data.push({
      date: this.state.pickedDate,
      weight: Number(this.state.weightText)
    });
    console.log(JSON.stringify(data));
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data));
    } catch (error) {
      console.log(error)
      alert('Error saving data..')
    }
  }

  onChangeWeight(e) {
    if (Number.isNaN(Number(e)) === true) {
      return alert('Please only input numbers');
    } else {
      this.setState({
        weightText: e
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#afbacc' }}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Date: {this.state.pickedDate}</Text>
          <TouchableHighlight
            style={styles.datePicker}
            onPress={this.showDatePicker}>
            <Text style={styles.dateButton}>Change Date</Text>
          </TouchableHighlight>
        </View>
        <TextInput style={styles.weightTextInput}
          keyboardType='number-pad'
          onChangeText={this.onChangeWeight}
          value={this.state.weightText}
          maxLength={3}
          placeholder='Weight'
          autoFocus={true}
          textAlign={'center'}
        />
        <TouchableHighlight
          style={styles.addButton}
          onPress={this.submitData}>
          <Text style={styles.addText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weightTextInput: {
    marginBottom: 20,
    borderColor: 'gray',
    fontSize: 22,
    backgroundColor: '#d8d8d8',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  datePicker: {
    backgroundColor: 'gray',
    width: 100,
    height: 30,
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
  },
  dateText: {
    margin: 5,
    fontSize: 20,
    fontWeight: '300'
  },
  dateContainer: {
    flexDirection: 'row',
    margin: 20
  },
  dateButton: {
    fontSize: 14
  },
  addText: {
    fontSize: 26,
    fontWeight: '800'
  },
  addButton: {
    backgroundColor: 'green',
    width: 200,
    height: 60,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
