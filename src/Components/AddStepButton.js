import React, { Component } from 'react';
import { TouchableNativeFeedback, View, StyleSheet, Text } from 'react-native';

export default class AddStepButton extends Component {
    constructor() {
        super();
        this.showAddStepModal = this.showAddStepModal.bind(this)
    }

    showAddStepModal() {
        console.log(this.props.navigation.navigate('AddStep'))
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.showAddStepModal}
                background={TouchableNativeFeedback.SelectableBackground()}
                style={styles.native}>
                <View style={styles.button}>
                    <Text style={styles.text}>+</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 10
    },
    text: {
        // margin: 30,
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
        opacity: .75
    },
    native: {
        // justifyContent: 'center'
    }
})