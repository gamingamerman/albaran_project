import React, { useCallback, useState } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSmtpMailer from "react-native-smtp-mailer";
import {
    ScrollView,
    Modal,
    Text,
    View,
    TouchableOpacity,
    Pressable
} from 'react-native';

//  Components
import ProductComponent from '../components/Product';

//  Styles
import { albaranScreenDetail } from '../styles/Styles';

export const AlbaranScreenDetail = (props) => {
    const route = useRoute();
    let RNFS = require('react-native-fs');

    const [productDetails, updateProductDetails] = useState()
    const [nameAlbaran, updateNameAlbaran] = useState('');
    const [modal, setModal] = useState(false);

    const nombreAlbaran = async () => {
        try {
            const res = JSON.parse(await AsyncStorage.getItem('albaran'))
            const result = res.find((item) => item.id_albaran === route.params.id)
            updateNameAlbaran(result.registry)
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const res = JSON.parse(await AsyncStorage.getItem('albaran'))
            const result = res.find((item) => item.id_albaran === route.params.id)
            updateProductDetails(result.products)
        } catch (e) {
            console.log(e)
        }
    }

    const handleEmail = async () => {

        let data = JSON.parse(await AsyncStorage.getItem('albaran'))
        let mail = await AsyncStorage.getItem('mail')

        let selectedAlbaran = data.find((item) => item.id_albaran === route.params.id)

        RNSmtpMailer.sendMail({
            mailhost: "smtp.gmail.com",
            port: "465",
            ssl: true,
            username: "jonasmaches@gmail.com",
            password: "fqvtggxjieazfudb",
            fromName: "Jonas",
            recipients: mail,
            subject: "test correo otra vez",
            htmlBody: "<h1>Confirmación de Envío de Albaranes</h1><p>Aquí tiene el albarán confirmado:</p>",
            attachmentPaths: [
                RNFS.DocumentDirectoryPath + '/' + selectedAlbaran.registry + '.csv'
            ],
            attachmentNames: [
                selectedAlbaran.registry + '.csv'
            ]
        })
            .then(success => console.log(success))
            .catch(err => console.log(err));
    }

    const fileWrite = async () => {

        let data = JSON.parse(await AsyncStorage.getItem('albaran'))
        let selectedAlbaran = data.find((item) => item.id_albaran === route.params.id)

        let textBody = ''

        selectedAlbaran.products.forEach(element => {
            textBody += selectedAlbaran.code + ',' + selectedAlbaran.registry + ',' + element.name_product + ',' + element.quantity + '\n'
        });

        let path = RNFS.DocumentDirectoryPath + '/' + selectedAlbaran.registry + '.csv';
        RNFS.writeFile(path, textBody, 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
        console.log(textBody)
    }

    useFocusEffect(
        useCallback(() => {
            if (typeof (route.params.id) == 'number') {
                getData()
            }
        }, [])
    )

    nombreAlbaran();

    return (
        <View style={albaranScreenDetail.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}
            >
                <View style={albaranScreenDetail.centeredView}>
                    <View style={albaranScreenDetail.modalView}>
                        <Text style={albaranScreenDetail.modalText}>Desea eliminar el albarán?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[albaranScreenDetail.button, albaranScreenDetail.buttonClose]}
                                onPress={() => setModal(!modal)}>
                                <Text style={albaranScreenDetail.textStyle}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[albaranScreenDetail.button, albaranScreenDetail.buttonClose]}
                                onPress={async () => {
                                    setModal(!modal);
                                    await fileWrite();
                                    handleEmail();
                                }}>
                                <Text style={albaranScreenDetail.textStyle}>Aceptar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={albaranScreenDetail.topContainer}>
                <View style={albaranScreenDetail.titleCard}>
                    <View style={albaranScreenDetail.marginTitleCard}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>{nameAlbaran}</Text>
                        <Text>Cod. cliente: B4XXXXXXX</Text>
                    </View>
                </View>
                <View style={albaranScreenDetail.albaranCode}>
                    <View style={albaranScreenDetail.codeStyle}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>001</Text>
                    </View>
                </View>
                <Icon.Button
                    name='gear'
                    size={60}
                    backgroundColor='transparent'
                    underlayColor='none'
                    onPress={() => { props.navigation.navigate("SettingsScreen") }}
                />
            </View>
            <View style={albaranScreenDetail.bodyContainer}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 40 }}>Productos</Text>
                </View>
                <ScrollView stickyHeaderIndices={[1]}>
                    <Table>
                        <ProductComponent data={(route.params.id !== 0) ? route.params.id : ''} />
                    </Table>
                </ScrollView>
                <View style={albaranScreenDetail.actionContainer}>
                    <TouchableOpacity style={albaranScreenDetail.mailContainer}>
                        <Icon
                            name='send'
                            size={40}
                            style={albaranScreenDetail.mailIcon}
                            onPress={() => {
                                setModal(!modal)
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={albaranScreenDetail.addContainer}>
                        <Icon
                            name='plus'
                            size={50}
                            style={albaranScreenDetail.addIcon}
                            onPress={() => {
                                props.navigation.navigate('ScannerScreen', { id: route.params.id })
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={albaranScreenDetail.navContainer}>
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

export default AlbaranScreenDetail;