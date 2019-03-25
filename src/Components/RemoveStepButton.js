import React, { Component } from 'react';
import { TouchableNativeFeedback, View, StyleSheet, Text } from 'react-native';

export default class RemoveStepButton extends Component {
    constructor() {
        super();
        this.showAddStepModal = this.showAddStepModal.bind(this)
    }

    showAddStepModal() {
        this.props.navigation.navigate('RemoveStep');
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.showAddStepModal}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.button}>
                    <Text style={styles.text}>Remove{'\n'}Weight Log</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        // width: 100,
        // height: 100,
        flex: 1,
        backgroundColor: 'red',
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