import React, { Component } from 'react';
import { TouchableNativeFeedback, View, StyleSheet, Text } from 'react-native';

export default class AddStepButton extends Component {
    constructor() {
        super();
        this.showAddStepModal = this.showAddStepModal.bind(this)
    }

    showAddStepModal() {
        this.props.navigation.navigate('AddStep');
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.showAddStepModal}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.button}>
                    <Text style={styles.text}>Add{'\n'}Weight Log</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        // width: 'auto',
        // height: 'auto',
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        opacity: .75
    }
})