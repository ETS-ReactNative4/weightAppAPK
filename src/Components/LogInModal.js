import React, { Component } from 'react';
import { Modal, Text, View, Alert, Button } from 'react-native';
import { TextInput, TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

export default class LogIn extends Component {
    constructor() {
        super();
        this.logInUser = this.logInUser.bind(this);
        this.state = {
            modalVisible: true,
            text: 'Text'

        };
    }

    logInUser() {
        console.log('Hi')
        // return fetch('mongodb://TYohoJr:Festive9631@ds135619.mlab.com:35619/weight-app', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        // var request = new XMLHttpRequest();
        // console.log(request)
        // if (request.readyState !== 4) {
        //     return;
        // }

        // if (request.status === 200) {
        //     console.log('success', request.responseText)
        // } else {
        //     console.log('error')
        // }
        // request.open('GET', "mongodb://TYohoJr:Festive9631@ds135619.mlab.com:35619/weight-app");
        // request.send();

        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        axios.post('/signUpData', { username: 'Test', password: 'Test' }, config).then((result) => {
            alert(result.data)
        }).catch((error) => {
            console.log(error)
        })
        this.props.navigation.navigate('Home')
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Username</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />
                            <Button
                                title='Log In'
                                onPress={this.logInUser}
                            />
                            <Button
                                title='Hide Modal'
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}