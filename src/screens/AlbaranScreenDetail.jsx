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
    const [codCliente, updateCodCliente] = useState('');
    const [modal, setModal] = useState(false);
    const [modalSent, setModalSent] = useState(false);

    // Displays the name of the albaran and the code. Also works for the permanent history of albaranes
    const nombreAlbaran = async () => {
        try {
            const res = JSON.parse(await AsyncStorage.getItem('albaran'))
            const result = res.find((item) => item.id_albaran === route.params.id)

            const resHis = JSON.parse(await AsyncStorage.getItem('albaranHistory'))
            const resultHis = resHis.find((item) => item.id_albaran === route.params.id)
            if (typeof(result) == 'undefined') {
                updateNameAlbaran(resultHis.registry)
                updateCodCliente(resultHis.code)
            }
            updateNameAlbaran(result.registry)
            updateCodCliente(result.code)
        } catch (e) {
            console.log(e)
        }
    }

    // Changes the status of the albaran to sent. A check will appear if the albaran has been sent in the Main Screen
    const changeToSent = async () => {
        try {
            const res = JSON.parse(await AsyncStorage.getItem('albaran'))
            const result = res.find((item) => item.id_albaran === route.params.id)
            result.sent = true

            const resHis = JSON.parse(await AsyncStorage.getItem('albaranHistory'))
            const resultHis = resHis.find((item) => item.id_albaran === route.params.id)
            resultHis.sent = true

            let foundIndex = res.findIndex(x => x.id_albaran === route.params.ID);
            res[foundIndex] = result
            resHis[foundIndex] = resultHis
            console.log(res)
            await AsyncStorage.setItem('albaran', JSON.stringify(res))
            await AsyncStorage.setItem('albaranHistory', JSON.stringify(resHis))
        } catch (e) {
            console.log(e)
        }
    }

    // Retrieves the prodcuts of the selected albaran, if it has any. Works as well with the permanent history of albaran
    const getData = async () => {
        try {
            const res = JSON.parse(await AsyncStorage.getItem('albaran'))
            const result = res.find((item) => item.id_albaran === route.params.id)
            
            const resHis = JSON.parse(await AsyncStorage.getItem('albaranHistory'))
            const resultHis = resHis.find((item) => item.id_albaran === route.params.id)
            if (typeof(result) == 'undefined') {
                updateProductDetails(resultHis.products)
                console.log(productDetails)
            } else {
            updateProductDetails(result.products)
            }
            updateProductDetails(result.products)

        } catch (e) {
            console.log(e)
        }
    }

    // Function that handles the email logic and sends it to the reciever
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
            .then(success => {
                setModalSent(!modalSent)
                changeToSent();
                }
            )
            .catch(err => console.log(err));
    }

    // Writes the csv file
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
                        <Text style={albaranScreenDetail.modalText}>Desea enviar el albarán?</Text>
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
                                    await handleEmail();
                                }}>
                                <Text style={albaranScreenDetail.textStyle}>Aceptar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalSent}
                onRequestClose={() => {
                    setModalSent(!modalSent);
                }}
            >
                <View style={albaranScreenDetail.centeredView}>
                    <View style={albaranScreenDetail.modalView}>
                        <Text style={albaranScreenDetail.modalText}>Albarán Enviado.</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[albaranScreenDetail.button, albaranScreenDetail.buttonClose]}
                                onPress={async () => {
                                    setModalSent(!modalSent);
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
                        <Text>Cod. cliente: {codCliente}</Text>
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

                    <TouchableOpacity style={albaranScreenDetail.mailContainer} >
                        <Icon
                            name='qrcode'
                            size={40}
                            style={albaranScreenDetail.qrIcon}
                            onPress={() => {
                                props.navigation.navigate('ScannerScreen', { id: route.params.id })
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={albaranScreenDetail.addContainer} onPress={() => {
                        props.navigation.navigate('ManualAddScreen', { id: route.params.id })
                    }}>
                        <Icon
                            name='plus'
                            size={50}
                            style={albaranScreenDetail.addIcon}
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

export default AlbaranScreenDetail;