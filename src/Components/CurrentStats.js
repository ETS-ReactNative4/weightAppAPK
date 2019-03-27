import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AddStepButton from './AddStepButton';
import RemoveStepButton from './RemoveStepButton';

export default class CurrentStats extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.loadData = this.loadData.bind(this);
        this.daysBetween = this.daysBetween.bind(this);
        this.nextWeighIn = this.nextWeighIn.bind(this);
        this.state = {
            currentWeight: 'Loading..',
            lbsLeft: 'Loading..',
            lbsPerWeek: 'Loading..',
            nextWeekGoal: 'Loading..',
            daysLeft: 'Loading..',
            totalLost: 'Loading',
            startDate: 'Loading..',
            nextWeighInDate: 'Loading..',
            daysToWeighIn: 'Loading..',
            daysToWeighInStyle: styles.dataText,
            lastWeightLog: 'Loading..',
        }
    }

    loadData(data) {
        let mostRecentEntry = data[data.length - 1];
        let nextWeighInDate = this.nextWeighIn(data[data.length - 1]);
        let currentWeight = mostRecentEntry.weight;
        let lbsLeft = (currentWeight - data[0].goalWeight).toFixed(1);
        let daysLeft = this.daysBetween(data[0].goalDate)
        let lbsPerWeek = Number(((lbsLeft / daysLeft) * 7)).toFixed(1);
        let nextWeekGoal = currentWeight - lbsPerWeek;
        let totalLost = (data[0].weight - currentWeight).toFixed(1);
        let startDate = data[0].date
        this.setState({
            currentWeight,
            lbsLeft,
            lbsPerWeek,
            nextWeekGoal,
            daysLeft,
            totalLost,
            startDate,
            nextWeighInDate: nextWeighInDate[0],
            daysToWeighIn: nextWeighInDate[1],
            lastWeightLog: nextWeighInDate[2]
        })
    }

    daysBetween(endDate) {
        let startDateTime = new Date().getTime();
        let oneDay = 1000 * 60 * 60 * 24;
        let daysBetween = Math.floor((endDate - startDateTime) / oneDay);
        return daysBetween
    }

    nextWeighIn(lastEntry) {
        let oneWeekMS = 1000 * 60 * 60 * 24 * 7;
        let lastWeightLog = new Date(lastEntry.dateTime).toLocaleDateString();
        let weighInDateInMS = oneWeekMS + lastEntry.dateTime;
        let weighInDate = new Date(weighInDateInMS).toLocaleDateString();
        let todayTime = new Date().getTime();
        let daysToWeighIn = Math.ceil((weighInDateInMS - todayTime) / (1000 * 60 * 60 * 24));
        if (daysToWeighIn < 1) {
            this.setState({
                daysToWeighInStyle: styles.pastDue
            })
        }
        return [weighInDate, daysToWeighIn, lastWeightLog]
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
                        <Text style={styles.labelText}>Last Weight Log</Text>
                        <Text style={styles.dataText}>{this.state.currentWeight} lbs{'\n'}on {this.state.lastWeightLog}</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Next Week Goal</Text>
                        <Text style={styles.dataText}>{this.state.nextWeekGoal} lbs</Text>
                    </Row>
                    <Row style={styles.buttonContainer}>
                        <AddStepButton navigation={this.props.navigation} />
                    </Row>
                </Col>
                <Col style={styles.colContainer}>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Lbs Remaining</Text>
                        <Text style={styles.dataText}>{this.state.lbsLeft} lbs</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Days Left</Text>
                        <Text style={styles.dataText}>{this.state.daysLeft} days</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Next Weigh In</Text>
                        <Text style={this.state.daysToWeighInStyle}>{this.state.nextWeighInDate}{'\n'}{this.state.daysToWeighIn} day(s)</Text>
                    </Row>
                </Col>
                <Col style={styles.colContainer}>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Goal per Week</Text>
                        <Text style={styles.dataText}>{this.state.lbsPerWeek} lbs/week</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Total Lost</Text>
                        <Text style={styles.startDateText}>(Started on {this.state.startDate})</Text>
                        <Text style={styles.dataText}>{this.state.totalLost} lbs</Text>
                    </Row>
                    <Row style={styles.buttonContainer}>
                        <RemoveStepButton style={styles.removeStepBtn} navigation={this.props.navigation} />
                    </Row>
                </Col>
            </Grid>
        )
    }
}

const styles = StyleSheet.create({
    gridContainer: {
        height: Dimensions.get('window').height / 2.
    },
    colContainer: {
        color: 'black'
    },
    rowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'silver',
        flex: 1,
        flexDirection: 'column',
        margin: 3
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    startDateText: {
        fontSize: 12
    },
    dataText: {
        margin: 8,
        textAlign: 'center'
    },
    pastDue: {
        color: 'red',
        textAlign: 'center'
    }
})