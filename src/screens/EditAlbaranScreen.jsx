import { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Modal,
    Text,
    View,
    Pressable,
    TextInput
} from 'react-native';

//  Styles
import { editAlbaranScreen } from '../styles/Styles';

export const EditAlbaranScreen = (props) => {
    const route = useRoute();

    const [matricula, setMatricula] = useState('');
    const [codigo, setCodigo] = useState('');
    const [modal, setModal] = useState(false);

    const syncData = async () => {
        try {
            let albaran = JSON.parse(await AsyncStorage.getItem('albaran'));
            let selectedAlbaran = albaran.find((item) => item.id_albaran === route.params.ID)
            setMatricula(selectedAlbaran.registry)
            setCodigo(selectedAlbaran.code)
        } catch (e) {
            console.log(e)
        }
    }

    const modifyData = async () => {
        try {
            let albaran = JSON.parse(await AsyncStorage.getItem('albaran'));
            let selectedAlbaran = albaran.find((item) => item.id_albaran === route.params.ID)
            selectedAlbaran.registry = matricula;
            selectedAlbaran.code = codigo;

            let foundIndex = albaran.findIndex(x => x.id_albaran === route.params.ID);
            albaran[foundIndex] = selectedAlbaran
            await AsyncStorage.setItem('albaran', JSON.stringify(albaran))
        } catch (e) {
            console.log(e)
        }
    }

    const deleteEntry = async () => {
        try {
            let albaran = JSON.parse(await AsyncStorage.getItem('albaran'));
            let foundIndex = albaran.findIndex(x => x.id_albaran === route.params.ID);
            albaran.splice(foundIndex, 1)

            await AsyncStorage.setItem('albaran', JSON.stringify(albaran));
        } catch (e) {
            console.log(e);
        }
    }

    useFocusEffect(
        useCallback(() => {
            syncData()
        }, [])
    )

    return (
        <View style={editAlbaranScreen.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}
            >
                <View style={editAlbaranScreen.centeredView}>
                    <View style={editAlbaranScreen.modalView}>
                        <Text style={editAlbaranScreen.modalText}>Desea eliminar el albarán?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[editAlbaranScreen.button, editAlbaranScreen.buttonClose]}
                                onPress={() => setModal(!modal)}>
                                <Text style={editAlbaranScreen.textStyle}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[editAlbaranScreen.button, editAlbaranScreen.buttonClose]}
                                onPress={async () => {
                                    setModal(!modal)
                                    await deleteEntry();
                                    props.navigation.navigate('MainScreen')
                                }}>
                                <Text style={editAlbaranScreen.textStyle}>Aceptar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={editAlbaranScreen.topContainer}>
                <Icon.Button
                    name='gear'
                    size={60}
                    backgroundColor='transparent'
                    underlayColor='none'
                    onPress={() => { props.navigation.navigate("SettingsScreen") }}
                />
                <Icon.Button
                    name='arrow-left'
                    size={60}
                    backgroundColor='transparent'
                    underlayColor='none'
                    onPress={() => props.navigation.navigate('MainScreen')}
                />
            </View>
            <View style={editAlbaranScreen.bodyContainer}>
                <View style={editAlbaranScreen.formContainer}>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Matrícula</Text>
                        <TextInput
                            style={{ height: 40, backgroundColor: '#191919', borderRadius: 5 }}
                            placeholder="introduzca la matrícula"
                            onChangeText={newText => setMatricula(newText)}
                            defaultValue={matricula}
                        />
                    </View>
                    <View style={{ marginTop: '20%', marginBottom: '10%' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Código del Cliente</Text>
                        <TextInput
                            style={{ height: 40, backgroundColor: '#191919', borderRadius: 5 }}
                            placeholder="introduzca el código"
                            onChangeText={newText => setCodigo(newText)}
                            defaultValue={codigo}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '20%' }}>
                        <Pressable
                            style={[editAlbaranScreen.button, editAlbaranScreen.buttonClose]}
                            onPress={async () => {
                                await modifyData();
                                console.log(props.navigation.navigate('MainScreen'))
                            }}>
                            <Text style={editAlbaranScreen.textStyle}>Modificar</Text>
                        </Pressable>
                        <Pressable
                            style={[editAlbaranScreen.button, editAlbaranScreen.buttonRemove]}
                            onPress={() => {
                                setModal(true)
                            }}>
                            <Text style={editAlbaranScreen.textStyle}>Eliminar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={editAlbaranScreen.navContainer}>
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

export default EditAlbaranScreen;