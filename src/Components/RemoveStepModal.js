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
    Button,
    Alert
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Checkbox } from 'react-native-elements';

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
        this.confirmDelete = this.confirmDelete.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.state = {
            modalVisible: true,
            tableOfData: <Text>Loading..</Text>,
            clickedValue: ''
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
        try {
            await AsyncStorage.setItem('data', JSON.stringify(data));
        } catch (error) {
            console.log(error)
            alert('Error saving data..')
        }
    }

    mapData(data) {
        let mappedData = data.map((item, i, arr) => {
            return <Row key={i} style={styles.rows}>
                <Col style={styles.columns}>
                    <TouchableHighlight
                        style={styles.delButtons}
                        onPress={() => { this.confirmDelete(i, arr[i]) }}>
                        <Text style={styles.delButtonText}>Remove</Text>
                    </TouchableHighlight>
                </Col>
                <Col style={styles.columns}>
                    <Text style={styles.text}>{item.date}</Text>
                </Col>
                <Col style={styles.columns}>
                    <Text style={styles.text}>{item.weight}lbs</Text>
                </Col>
            </Row>
        })
        this.setState({
            tableOfData: <Grid style={styles.gridContainer}>{mappedData}</Grid>
        })
    }

    confirmDelete(position, data) {
        if (position === 0) {
            alert('You cant remove your first log')
        } else {
            Alert.alert(
                'Confirm',
                `Are you sure you want to remove your log\n${data.date} - ${data.weight}lbs?`,
                [
                    {
                        text: 'No',
                        onPress: () => { },
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => { this.removeStep(position) }
                    }
                ],
                { cancelable: false }
            );
        }
    }

    removeStep(position) {
        new Promise((resolve, reject) =>{
            this.getData(resolve);
        }).then((result) =>{
            result.splice(position, 1)
            this.saveData(result);
            this.resetStack()
        })
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <Grid>
                    {this.state.tableOfData}
                </Grid>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    delButtons: {
        backgroundColor: 'red',
        width: 100,
        height: 30,
        alignItems: 'center',
        borderRadius: 25,
        justifyContent: 'center',
    },
    delButtonText: {
        fontSize: 22,
        color: 'black'
    },
    gridContainer: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rows: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    columns: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20
    },
    scrollView: {
        backgroundColor: '#afbacc'
    }
})
