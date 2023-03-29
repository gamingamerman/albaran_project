import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Modal,
    Text,
    View,
    TextInput,
    Pressable,
} from 'react-native';

//  Styles
import { formScreen } from '../styles/Styles';

export const FormScreen = (props) => {
    const [text, setText] = useState('');
    const [formModalVisible, setFormModalVisible] = useState(false);

    const storeData = async (value) => {
        try {
            if (JSON.parse(await AsyncStorage.getItem('albaran') !== null)) {
                let newAlbaran = JSON.parse(await AsyncStorage.getItem('albaran'));
                newAlbaran.push({
                    id_albaran : newAlbaran.length,
                    code : 'XXXXXXB12',
                    registry : value,
                    products : []
                })
                await AsyncStorage.setItem('albaran', JSON.stringify(newAlbaran))
            } else {
                firstAlbaran = [{
                    id_albaran : 0,
                    code : 'XXXXXXB12',
                    registry : value,
                    products : []
                }]
                await AsyncStorage.setItem('albaran', JSON.stringify(firstAlbaran))
            }
            
        } catch (e) {
          console.log(e)
        }
      }

    const formCheck = async() => {
        if (!text.trim()) {
            setFormModalVisible(true)
        } else {
            await storeData(text)
            props.navigation.navigate('MainScreen')
        }
    }
    
    return (
        <View style={formScreen.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={formModalVisible}
                onRequestClose={() => {
                    setModalVisible(!formModalVisible);
                }}
            >
                <View style={formScreen.centeredView}>
                    <View style={formScreen.modalView}>
                        <Text style={formScreen.modalText}>El campo está vacio.</Text>
                        <Pressable
                            style={[formScreen.button, formScreen.buttonClose]}
                            onPress={() => setFormModalVisible(!formModalVisible)}>
                            <Text style={formScreen.textStyle}>Aceptar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={formScreen.topContainer}>
                <Icon.Button
                    name='gear'
                    size={60}
                    backgroundColor='transparent'
                    underlayColor='none'
                    onPress={() => props.navigation.navigate('SettingsScreen')}
                />
                <Icon.Button
                    name='arrow-left'
                    size={60}
                    backgroundColor='transparent'
                    underlayColor='none'
                    onPress={() => props.navigation.navigate('MainScreen')}
                />
            </View>
            <View style={formScreen.bodyContainer}>
                <View style={formScreen.formContainer}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Matrícula</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: '#191919', borderRadius: 5 }}
                        placeholder="introduzca la matrícula"
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
                            onPress={() => { formCheck() }}
                        />
                    </View>
                </View>
            </View>
            <View style={formScreen.navContainer}>
                <View>
                    <Icon.Button
                        name='bars'
                        size={60}
                        backgroundColor='transparent'
                        underlayColor='none'
                        // onPress={() => { pressing() }}
                    />
                </View>
                <View>
                    <Icon.Button
                        name='home'
                        size={60}
                        backgroundColor='transparent'
                        underlayColor='none'
                        onPress={() => props.navigation.navigate('MainScreen')}
                    />
                </View>
            </View>
        </View>
    )
}

export default FormScreen