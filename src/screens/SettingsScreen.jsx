import { React, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Text,
    View,
    TextInput,
} from 'react-native';

//styles
import { settingsScreen } from '../styles/Styles';

export const SettingsScreen = (props) => {

    const [text, setText] = useState('');

    // Retrieves an existing email in the internal storage, if any. Or uses a default email
    const getEmail = async () => {
        try {
            let email = await AsyncStorage.getItem('mail')
            setText(email)
        } catch (e) {
            console.log(e)
        }
    }

    // Changes the existing email to another one
    const changeEmail = async (value) => {
        try {
            await AsyncStorage.setItem('mail', value)
        } catch (e) {
            console.log(e)
        }
    }

    useFocusEffect(
        useCallback(
            () => {
                getEmail()
            },
            [],
        )
    )

    return (
        <View style={settingsScreen.container}>
            <View style={settingsScreen.topContainer}>
                <Icon.Button
                    name='arrow-left'
                    size={60}
                    backgroundColor='transparent'
                    underlayColor='none'
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            <View style={settingsScreen.bodyContainer}>
                <View style={settingsScreen.formContainer}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Mandar Correo a:</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: '#191919', borderRadius: 5 }}
                        placeholder="Introduzca la matrícula"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }} />
                        <Icon.Button
                            name='check'
                            size={40}
                            color='green'
                            backgroundColor='transparent'
                            underlayColor='none'
                            style={{ alignSelf: 'flex-end', }}
                            onPress={async () => { changeEmail(text) }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsScreen