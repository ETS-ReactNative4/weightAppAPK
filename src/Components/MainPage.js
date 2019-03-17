import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, ToolbarAndroid, Text, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class MainPage extends Component {
    render() {
        var data = [
            {
                number: 1,
                name: 'one',
                order: 'test'
            },
            {
                number: 2,
                name: 'two',
                order: 'test'
            },
            {
                number: 3,
                name: 'three',
                order: 'test'
            },
            {
                number: 4,
                name: 'four',
                order: 'test'
            },
        ]
        let dataMap = data.reverse().map((item, i, arr) => {
            let oldDataStyles = styles.oldData;
            if (i === 0) {
                oldDataStyles = styles.currentData;
            }
            return <Row key={i} style={{
                backgroundColor: '#bed3f4',
                height: 50,
            }}>
                <Col><Text style={oldDataStyles}>{item.number}</Text></Col>
                <Col><Text style={oldDataStyles}>{item.name}</Text></Col>
                <Col><Text style={oldDataStyles}>{item.order}</Text></Col>
            </Row>
        })
        return (
            <ScrollView contentContainerStyle={styles.scrollView}
            >
                <Grid>
                    {dataMap}
                </Grid>
                {/* <Button title='Add Step' /> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    oldData: {
        fontSize: 20,
        // fontWeight: 'bold'
    },
    currentData: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    scrollView: {
        paddingTop: 20
    }
});