import React, { useState, useCallback, } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Modal,
    Text,
    View,
} from 'react-native';

//  Styles
import { scannerScreen } from '../styles/Styles';

export const ScannerScreen = (props) => {
    const route = useRoute()
    
    const [dataQR, setDataQR] = useState([]);
    const [messageModalVisible, setMessageModalVisible] = useState(false);

    // This function focuses on the albaran thats selected to add products that are being scanned
    const mountData = async() => {
        let albaran = JSON.parse(await AsyncStorage.getItem('albaran'))
        let filteredAlbaran = albaran.find((item) => item.id_albaran === route.params.id)
        setDataQR(filteredAlbaran)
    }

    // This function is what actually adds the prodcuts into the albaranes
    const keepData = async(scannedData) => {
        dataQR.products.push({id_product: dataQR.products.length, name_product: scannedData, quantity: 1})
        let albaran = JSON.parse(await AsyncStorage.getItem('albaran'))
        let foundIndex = albaran.findIndex(x => x.id_albaran === dataQR.id_albaran)
        albaran[foundIndex] = dataQR;
        await AsyncStorage.setItem('albaran', JSON.stringify(albaran))
    }

    // Same as keepData() but works only for the permanent history
    const keepDataHistory = async(scannedData) => {
        // dataQR.products.push({id_product: dataQR.products.length, name_product: scannedData, quantity: 1})
        let albaran = JSON.parse(await AsyncStorage.getItem('albaranHistory'))
        let foundIndex = albaran.findIndex(x => x.id_albaran === dataQR.id_albaran)
        albaran[foundIndex] = dataQR;
        await AsyncStorage.setItem('albaranHistory', JSON.stringify(albaran))
    }

    // Function that executes every function in order
    const verifyData = (data) => {
        setMessageModalVisible(true)
        keepData(data);
        keepDataHistory(data);
        setTimeout(() => {
            setMessageModalVisible(false)
        }, 3000)
    }

    useFocusEffect(
        useCallback(() => {
            mountData()
        },[])
    )

    return (
        <QRCodeScanner
            onRead={({ data }) => { 
                verifyData(data) 
            }}
            reactivate={true}
            reactivateTimeout={3100}
            showMarker={true}
            markerStyle={{
                borderColor: 'black'
            }}
            containerStyle={{
                backgroundColor: ''
            }}
            topContent={
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={messageModalVisible}
                        onRequestClose={() => {
                            setMessageModalVisible(!messageModalVisible);
                        }}
                    >
                        <View style={scannerScreen.centeredView}>
                            <View style={scannerScreen.modalView}>
                                <Text style={scannerScreen.modalText}>Se ha añadido Correctamente.</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
            bottomContent={
                <View style={scannerScreen.bottomStyle}>
                    <Icon.Button
                    name='arrow-left'
                    size={60}
                    backgroundColor='transparent'
                    underlayColor='none'
                    style={scannerScreen.iconStyle}
                    onPress={() => props.navigation.navigate('AlbaranScreenDetail', {id: route.params.id})}
                    />
                </View>
            }
        />
    )
}

export default ScannerScreen;