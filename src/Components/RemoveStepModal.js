import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    Alert
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
        this.confirmDelete = this.confirmDelete.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.deleteAllData = this.deleteAllData.bind(this);
        this.confirmDeleteAll = this.confirmDeleteAll.bind(this);
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
            alert('You cant remove your first log.\nChoose "Delete All" to start a new goal.')
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

    confirmDeleteAll() {
        Alert.alert(
            'Confirm Delete All Data',
            `This will delete all of your logs and goals. You will be sent back to the create goal screen.\nAre you sure?`,
            [
                {
                    text: 'No',
                    onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => { this.deleteAllData() }
                }
            ],
            { cancelable: false }
        );
    }

    removeStep(position) {
        new Promise((resolve, reject) => {
            this.getData(resolve);
        }).then((result) => {
            result.splice(position, 1)
            this.saveData(result);
            this.resetStack()
        })
    }

    deleteAllData = async () => {
        try {
            await AsyncStorage.removeItem('data');
            this.resetStack();
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <Grid>
                    {this.state.tableOfData}
                </Grid>
                <View style={styles.delAllBtnContainer}>
                    <TouchableHighlight
                        style={styles.delAllButton}
                        onPress={this.confirmDeleteAll}>
                        <Text style={styles.delAllButtonText}>Delete All</Text>
                    </TouchableHighlight>
                </View>
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
    delAllButton: {
        backgroundColor: 'red',
        width: 150,
        height: 80,
        alignItems: 'center',
        borderRadius: 25,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    delAllButtonText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black'
    },
    delAllBtnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
