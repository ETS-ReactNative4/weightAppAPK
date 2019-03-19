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
        weight: 130
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
    constructor() {
        super();
        this.retrieveData = this.retrieveData.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadChart = this.loadChart.bind(this);
        this.loadTestData = this.loadTestData.bind(this);
        this.state = {
            showChart: <Text>Loading...</Text>,
        }
    }

    loadTestData = async () => {
        try {
            await AsyncStorage.setItem('data', JSON.stringify(userData));
        } catch (error) {
            console.log(error)
        }
    }

    retrieveData = async (resolve) => {
        try {
            const value = await AsyncStorage.getItem('data');
            if (value !== null) {
                resolve(JSON.parse(value))
            }
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
                    width={Dimensions.get('window').width}
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
                        marginVertical: 8,
                        borderRadius: 16,
                        margin: 5
                    }}
                />
            })
        } else {
            alert('Error loading data')
        }
    }

    componentWillMount() {
        // if (this.state.showChart.props.children === 'Loading...') {
        new Promise((resolve, reject) => {
            this.retrieveData(resolve)
        }).then((result) => {
            return this.loadData(result);
        }).then((result) => {
            this.loadChart(result)
        }).catch((error) => {
            console.log(error)
        })
        // }
    }

    render() {
        return (
            <View>
                {this.state.showChart}
                <Button onPress={this.loadTestData}
                    title='Load Test Data' />
            </View>
        )
    }
}
