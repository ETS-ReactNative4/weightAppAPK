import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Button, View, Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
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

var showChart;

export default class DataGraph extends Component {
    constructor() {
        super();
        this.storeData = this.storeData.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadChart = this.loadChart.bind(this);
        this.state = {
            showChart: <Text>Loading...</Text>,
        }
    }

    storeData = async () => {
        try {
            console.log("testsend")
            await AsyncStorage.setItem('data', JSON.stringify(userData));
        } catch (error) {
            console.log(error)
        }
    }

    retrieveData = async (resolve) => {
        try {
            const value = await AsyncStorage.getItem('data');
            if (value !== null) {
                console.log(value)
                // loadedData = JSON.parse(value);
                resolve(JSON.parse(value))
            }
        } catch (error) {
            console.log(error)
        }
    }


    loadData(data) {
        console.log('_loadData ran')
        let labels = data.map((item, i, arr) => {
            return item.date
        })
        let dataSet = data.map((item, i, arr) => {
            return item.weight
        })
        console.log(labels, dataSet)
        return [labels, dataSet]
    }

    loadChart(data) {
        this.setState({
            showChart: <LineChart
                data={{
                    labels: data[0],
                    datasets: [
                        {
                            data: data[1]
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
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    margin: 5
                }}
            />
        })
    }



    componentWillMount() {
        if (this.state.showChart.props.children === 'Loading...') {
            new Promise((resolve, reject) => {
                this.retrieveData(resolve)
            }).then((result) => {
                return this.loadData(result);
            }).then((result) => {
                this.loadChart(result)
            })
        }
    }

    render() {
        return (
            <View>
                {this.state.showChart}
            </View>
        )
    }
}
