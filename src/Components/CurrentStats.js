import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AddStepButton from './AddStepButton';

export default class CurrentStats extends Component {
    constructor() {
        super();
        this.loadData = this.loadData.bind(this);
        this.daysBetween = this.daysBetween.bind(this);
        this.state = {
            currentWeight: 'Loading..',
            lbsLeft: 'Loading..',
            lbsPerWeek: 'Loading..',
            nextWeekGoal: 'Loading..',
            daysLeft: 'Loading..',
            totalLost: 'Loading',
            startDate: 'Loading..',
        }
    }

    loadData(data) {
        // Add daysTilNextWeighIn
        let mostRecentEntry = data[data.length - 1];
        let currentWeight = mostRecentEntry.weight;
        let lbsLeft = currentWeight - data[0].goalWeight;
        let daysLeft = this.daysBetween(data[0].goalDate)
        let lbsPerWeek = Number(((lbsLeft / daysLeft) * 7)).toFixed(1);
        let nextWeekGoal = currentWeight - lbsPerWeek;
        let totalLost = data[0].weight - currentWeight;
        let startDate = data[0].date
        this.setState({
            currentWeight,
            lbsLeft,
            lbsPerWeek,
            nextWeekGoal,
            daysLeft,
            totalLost,
            startDate
        })
    }

    daysBetween(endDate) {
        let startDateTime = new Date().getTime();
        let endDateTime = new Date(endDate.year, endDate.month, endDate.day).getTime();
        let oneDay = 1000 * 60 * 60 * 24;
        let daysBetween = Math.floor((endDateTime - startDateTime) / oneDay);
        return daysBetween
    }

    componentWillMount() {
        new Promise((resolve, reject) => {
            this.props.retrieveData(resolve)
        }).then((result) => {
            this.loadData(result);
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <Grid style={styles.gridContainer}>
                <Col style={styles.colContainer}>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Current Weight</Text>
                        <Text style={styles.dataText}>{this.state.currentWeight}</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Next Week Goal</Text>
                        <Text style={styles.dataText}>{this.state.nextWeekGoal}</Text>
                    </Row>
                    <Row style={styles.buttonContainer}>
                        <AddStepButton navigation={this.props.navigation} />
                    </Row>
                </Col>
                <Col style={styles.colContainer}>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Lbs Left</Text>
                        <Text style={styles.dataText}>{this.state.lbsLeft}</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Days Left</Text>
                        <Text style={styles.dataText}>{this.state.daysLeft}</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Days Left</Text>
                        <Text style={styles.dataText}>{this.state.daysLeft}</Text>
                    </Row>
                </Col>
                <Col style={styles.colContainer}>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Lbs/Wk</Text>
                        <Text style={styles.dataText}>{this.state.lbsPerWeek}</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Total Lost</Text>
                        <Text style={styles.startDateText}>(Started on {this.state.startDate})</Text>
                        <Text style={styles.dataText}>{this.state.totalLost}</Text>
                    </Row>
                    <Row style={styles.buttonContainer}>
                        <AddStepButton navigation={this.props.navigation} />
                    </Row>
                </Col>
            </Grid>
        )
    }
}

const styles = StyleSheet.create({
    gridContainer: {
        margin: 5
    },
    colContainer: {
    },
    rowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'gray',
        flex: 1,
        flexDirection: 'column'
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    startDateText: {
        fontSize: 12
    },
    dataText: {
        margin: 8
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        flex: 1,
        flexDirection: 'column'
    }
})