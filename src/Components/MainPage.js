import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { AsyncStorage } from 'react-native';

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

export default class MainPage extends Component {
    constructor() {
        super();
        this._storeData = this._storeData.bind(this);
        this._retrieveData = this._retrieveData.bind(this);
    }

    _storeData = async () => {
        try {
            console.log("testsend")
            await AsyncStorage.setItem('data2', JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }

    _retrieveData = async () => {
        try {
            console.log("testretrieve")
            const value = await AsyncStorage.getAllKeys();
            if (value !== null) {
                console.log(value);
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
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
            <View>
                <View >
                    <Button
                        contentViewStyle={styles.button}
                        title='Add Step'
                        color='red'
                        onPress={this.props.navigation.navigate('AddStep')}
                    />
                    <Button
                        contentViewStyle={styles.button}
                        title='Get Step'
                        color='red'
                        onPress={this._retrieveData}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.scrollView}
                >
                    <Grid>
                        {dataMap}
                    </Grid>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    oldData: {
        fontSize: 20,
    },
    currentData: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    scrollView: {
        // paddingTop: 20
    },
    button: {
        paddingTop: 300
    }
});