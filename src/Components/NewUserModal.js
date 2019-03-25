import React, { Component } from 'react';
import {
    Text,
    TextInput,
    TouchableHighlight,
    View,
    DatePickerAndroid,
    StyleSheet,
    AsyncStorage,
    BackHandler,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class NewUser extends Component {
    static navigationOptions = {
        header: null
    }
    _didFocusSubscription;
    _willBlurSubscription;
    constructor(props) {
        super(props);
        this.showCurrentDatePicker = this.showCurrentDatePicker.bind(this);
        this.submitData = this.submitData.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.saveData = this.saveData.bind(this);
        this.resetStack = this.resetStack.bind(this);
        this.onChangeGoalWeight = this.onChangeGoalWeight.bind(this);
        this.showGoalDatePicker = this.showGoalDatePicker.bind(this);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.state = {
            modalVisible: true,
            pickedDate: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
            pickedDateTime: new Date().getTime(),
            goalDate: '',
            goalDateText: '',
            weightText: '',
            goalWeightText: '',
        }
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () => {
        return true;
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    showCurrentDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    pickedDate: `${month + 1}/${day}`,
                    pickedDateTime: new Date(year, month, day).getTime()
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message)
        }
    }

    showGoalDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    goalDate: new Date(year, month, day).getTime(),
                    goalDateText: `${month + 1}/${day}`
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message)
        }
    }

    submitData() {
        if (!this.state.weightText || !this.state.goalWeightText || !this.state.goalDateText) {
            return alert('Please fill out all fields')
        } else {
            new Promise((resolve, reject) => {
                this.saveData(resolve)
            }).then(() => {
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

    saveData = async (resolve) => {
        let data = [{
            date: this.state.pickedDate,
            dateTime: this.state.pickedDateTime,
            weight: Number(this.state.weightText),
            goalDate: this.state.goalDate,
            goalWeight: Number(this.state.goalWeightText)
        }];
        console.log(JSON.stringify(data));
        try {
            await AsyncStorage.setItem('data', JSON.stringify(data));
            resolve();
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

    onChangeGoalWeight(e) {
        if (Number.isNaN(Number(e)) === true) {
            return alert('Please only input numbers');
        } else {
            this.setState({
                goalWeightText: e
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#afbacc' }}>
                <View style={styles.dateContainer}>
                    <View style={styles.welcomeTextContainer}>
                        <Text style={styles.welcomeText}>Welcome!</Text>
                        <Text style={styles.welcomeText}>Please submit your first log</Text>
                    </View>
                    <Text style={styles.dateText}>First Log Date: {this.state.pickedDate}</Text>
                    <TouchableHighlight
                        style={styles.datePicker}
                        onPress={this.showCurrentDatePicker}>
                        <Text style={styles.dateButton}>Change First Log Date</Text>
                    </TouchableHighlight>
                    <Text style={styles.dateText}>Goal Date: {this.state.goalDateText}</Text>
                    <TouchableHighlight
                        style={styles.datePicker}
                        onPress={this.showGoalDatePicker}>
                        <Text style={styles.dateButton}>Choose Goal Date</Text>
                    </TouchableHighlight>
                </View>
                <TextInput style={styles.weightTextInput}
                    keyboardType='number-pad'
                    onChangeText={this.onChangeWeight}
                    value={this.state.weightText}
                    maxLength={5}
                    placeholder='Current Weight'
                    autoFocus={false}
                    textAlign={'center'}
                    width={250}
                />
                <TextInput style={styles.weightTextInput}
                    keyboardType='number-pad'
                    onChangeText={this.onChangeGoalWeight}
                    value={this.state.goalWeightText}
                    maxLength={5}
                    placeholder='Goal Weight'
                    autoFocus={false}
                    textAlign={'center'}
                    width={250}
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
        width: 180,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    welcomeTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    }
})
