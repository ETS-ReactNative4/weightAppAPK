import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, ToolbarAndroid } from 'react-native';

export default class MyToolbar extends Component {
    constructor() {
        super();
        this.onActionSelected = this.onActionSelected.bind(this);
    }

    onActionSelected(position) {
        switch (position) {
            case 0:
                this.props.navigation.navigate('LogIn')
                break;
            default:
                alert('Error: Please try again')
        }
    }

    render() {
        return (
            <ToolbarAndroid
                style={styles.toolbar}
                title='Weight Tracker'
                actions={[
                    {
                        title: 'Log In'
                    },
                ]}
                onActionSelected={this.onActionSelected} />
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#2196F3',
        height: 50,
    }
});
