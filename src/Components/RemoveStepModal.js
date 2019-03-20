import React, { Component } from 'react';
import {
    Text,
    TextInput,
    TouchableHighlight,
    View,
    DatePickerAndroid,
    StyleSheet,
    AsyncStorage,
    ScrollView,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class RemoveStep extends Component {
    static navigationOptions = {
        title: "Back",
        headerStyle: {
            backgroundColor: '#afbacc',
        }
    }
    constructor() {
        super();
        this.saveData = this.saveData.bind(this);
        this.getData = this.getData.bind(this);
        this.resetStack = this.resetStack.bind(this);
        this.mapData = this.mapData.bind(this);
        this.state = {
            modalVisible: true,
            tableOfData: <Text>Loading..</Text>
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentWillMount() {
        new Promise((resolve, reject) => {
            this.getData(resolve);
        }).then((result) => {
            this.mapData(result);
        })
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
                resolve(JSON.parse(value));
            }
        } catch (error) {
            alert('Error saving data.')
        }
    }

    saveData = async (data) => {
        data.push({
            date: this.state.pickedDate,
            dateTime: this.state.pickedDateTime,
            weight: Number(this.state.weightText)
        });
        try {
            await AsyncStorage.setItem('data', JSON.stringify(data));
        } catch (error) {
            console.log(error)
            alert('Error saving data..')
        }
    }

    mapData(data) {
        let mappedData;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i])
            mappedData += <Row>
                <Col>
                    <Text>Checkbox</Text>
                </Col>
                <Col>
                    <Text>{data[i].date}</Text>
                </Col>
                <Col>
                    <Text>{data[i].weight}</Text>
                </Col>
            </Row>
        }
        this.setState({
            tableOfData: <Grid>{mappedData}</Grid>
        })
    }

    render() {
        return (
            <ScrollView>
                {this.state.tableOfData}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

})
