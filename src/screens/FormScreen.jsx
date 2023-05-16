import React, { useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute, useFocusEffect } from '@react-navigation/native';
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
    const route = useRoute();

    const [text, setText] = useState('');
    const [envio, setEnvio] = useState('');
    const [formModalVisible, setFormModalVisible] = useState(false);

    // Creates and / or adds a new Albaran and stores it in the internal database
    const storeData = async (value, value2) => {
        try {
            if (JSON.parse(await AsyncStorage.getItem('albaran') !== null)) {
                let newAlbaran = JSON.parse(await AsyncStorage.getItem('albaran'));
                newAlbaran.push({
                    id_albaran : newAlbaran.length,
                    code : value2 ,
                    registry : value,
                    products : [],
                    sent: false
                })
                await AsyncStorage.setItem('albaran', JSON.stringify(newAlbaran))
            } else {
                firstAlbaran = [{
                    id_albaran : 0,
                    code : value2,
                    registry : value,
                    products : [],
                    sent: false
                }]
                await AsyncStorage.setItem('albaran', JSON.stringify(firstAlbaran))
            }
            
        } catch (e) {
          console.log(e)
        }
      }
    
    // This is for the permanent history of albaranes. Same function as the one to create/add albaranes (storeData())
    const storeDataHistory = async(value, value2) => {
        try {
            if (JSON.parse(await AsyncStorage.getItem('albaranHistory') !== null)) {
                let newAlbaran = JSON.parse(await AsyncStorage.getItem('albaranHistory'));
                newAlbaran.push({
                    id_albaran : newAlbaran.length,
                    code : value2,
                    registry : value,
                    products : [],
                    sent: false
                })
                await AsyncStorage.setItem('albaranHistory', JSON.stringify(newAlbaran))
            } else {
                firstAlbaran = [{
                    id_albaran : 0,
                    code : value2,
                    registry : value,
                    products : [],
                    sent: false
                }]
                await AsyncStorage.setItem('albaranHistory', JSON.stringify(firstAlbaran))
            }
        } catch (e) {
            console.log(e)
        }
    }

    // Checks if the form fields to create albaranes is empty
    const formCheck = async() => {
        if (!text.trim() || !envio.trim()) {
            setFormModalVisible(true)
        } else {
            await storeData(text, envio)
            await storeDataHistory(text, envio)
            props.navigation.navigate('MainScreen')
        }
    }
    useFocusEffect(
        useCallback(() => {
            console.log(envio)
            if (route.params != undefined) {
                setEnvio(route.params.code)
                console.log(envio)
            }
        },[])
    )
    
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', bottom: 10 }}>Matrícula</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: '#191919', borderRadius: 5 }}
                        placeholder="introduzca la matrícula"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                    />
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: '10%', bottom: 10 }}>Nº de envío</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: '#191919', borderRadius: 5, width: '75%' }}
                        placeholder="introduzca el número de envío"
                        onChangeText={newText => setEnvio(newText)}
                        defaultValue={envio}
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', bottom: '10%'}}>
                    <Icon.Button
                            name='camera'
                            size={40}
                            color='grey'
                            backgroundColor='transparent'
                            underlayColor='none'
                            // style={{  }}
                            onPress={() => props.navigation.navigate('ScannerCodeScreen')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', top:'10%'}}>
                        <View style={{ flex: 1 }} />
                        
                        <Icon.Button
                            name='check'
                            size={40}
                            color='green'
                            backgroundColor='transparent'
                            underlayColor='none'
                            style={{ alignSelf: 'flex-end'}}
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
                        onPress={() => props.navigation.navigate('HistoryScreen')}
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