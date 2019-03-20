import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class CurrentStats extends Component {
    constructor() {
        super();
        this.showAddStepModal = this.showAddStepModal.bind(this);
        this.state = {
            currentWeight: 'Loading..',
            lbsLeft: 'Loading..',
            lbsPerWeek: 'Loading..',
            nextWeekGoal: 'Loading..',
            daysLeft: 'Loading..',
            totalLost: 'Loading',
        }
    }

    showAddStepModal() {
        this.props.navigation.navigate('AddStep');
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
                </Col>
                <Col style={styles.colContainer}>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Lbs/Wk Needed</Text>
                        <Text style={styles.dataText}>{this.state.lbsPerWeek}</Text>
                    </Row>
                    <Row style={styles.rowContainer}>
                        <Text style={styles.labelText}>Total Lost</Text>
                        <Text style={styles.dataText}>{this.state.totalLost}</Text>
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
        margin: 5,
        flex: 1,
        flexDirection: 'column'
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dataText: {
        margin: 8
    }
})