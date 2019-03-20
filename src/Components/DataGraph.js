import React, { Component } from 'react';
import { Text, View, Dimensions, Button } from 'react-native';
import { AsyncStorage, ToastAndroid } from 'react-native';
import {
    LineChart,
    onDataPointClick,
} from 'react-native-chart-kit';

var userData = [
    {
        date: '3/1',
        dateTime: 8378274823,
        weight: 130,
        goalDate: 123812832837,
        goalWeight: 100
    },
    {
        date: '3/2',
        weight: 123
    },
    {
        date: '3/3',
        weight: 125,
    },
    {
        date: '3/4',
        weight: 122,
    },
    {
        date: '3/5',
        weight: 120,
    },
    {
        date: '3/6',
        weight: 121,
    },
];

export default class DataGraph extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.loadData = this.loadData.bind(this);
        this.loadChart = this.loadChart.bind(this);
        this.loadTestData = this.loadTestData.bind(this);
        this.newUserTest = this.newUserTest.bind(this);
        this.deleteAllData = this.deleteAllData.bind(this);
        this.state = {
            showChart: <Text>Loading...</Text>,
        }
    }

    deleteAllData = async () => {
        try {
            await AsyncStorage.removeItem('data');
        } catch (error) {
            console.log(error)
        }
    }

    newUserTest() {
        this.props.navigation.navigate('NewUser')
    }

    loadTestData = async () => {
        try {
            await AsyncStorage.setItem('data', JSON.stringify(userData));
        } catch (error) {
            console.log(error)
        }
    }

    loadData(data) {
        let labels = data.map((item, i, arr) => {
            return item.date
        })
        let dataSet = data.map((item, i, arr) => {
            return item.weight
        })
        let metaData = data.map((item, i, arr) => {
            return i
        })
        return { labels, dataSet, metaData }
    }

    loadChart(data) {
        if (data) {
            this.setState({
                showChart: <LineChart
                    data={{
                        labels: data.labels,
                        datasets: [
                            {
                                data: data.dataSet,
                                metaData: data.metaData
                            },
                        ]
                    }}
                    width={Dimensions.get('window').width - 10}
                    height={500}
                    chartConfig={{
                        backgroundColor: '#a5a5a5',
                        backgroundGradientFrom: '#bcbcbc',
                        backgroundGradientTo: '#5b5b5b',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                    }}
                    onDataPointClick={({ value, dataset, getColor }) => {
                        ToastAndroid.show(`${value}lbs`, ToastAndroid.SHORT)
                    }}
                    style={{
                        // marginBottom: -50,
                        borderRadius: 16,
                        alignItems: 'center'
                    }}
                />
            })
        } else {
            alert('Error loading data')
        }
    }

    componentWillMount() {
        if (this.state.showChart.props.children === 'Loading...') {
            new Promise((resolve, reject) => {
                this.props.retrieveData(resolve);
            }).then((result) => {
                return this.loadData(result);
            }).then((result) => {
                this.loadChart(result);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    render() {
        return (
            <View>
                {this.state.showChart}
                <Button onPress={this.loadTestData}
                    title='Load Test Data' />
                <Button onPress={this.newUserTest}
                    title='New User Test' />
                <Button onPress={this.deleteAllData}
                    title='Delete All Data' />
            </View>
        )
    }
}
