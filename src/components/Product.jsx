import React, { useCallback, useState } from 'react';
import { Row, Rows } from 'react-native-table-component';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    TouchableOpacity,
} from 'react-native';

//  Styles
import { productStyle } from '../styles/Styles';

const ProductComponent = (props) => {
    const route = useRoute();
    const [products, updateProducts] = useState([])

    this.state = {
        tableHead: ['Estado', 'ID Producto', 'Cantidad', ''],
        tableData: [],
    }
    const insertItems = async () => {
        const res = JSON.parse(await AsyncStorage.getItem('albaran'))
        const result = res.find((item) => item.id_albaran === route.params.id)

        updateProducts(result.products)
    }
    const deleteAlbaran = async(id) => {
        let objectIndex = products.findIndex((item) => item.id_product == id)
        products.splice(objectIndex, 1)
        updateProducts(products => [...products])
        
        let albaran = JSON.parse(await AsyncStorage.getItem('albaran'))
        let foundIndex = albaran.findIndex(x => x.id_albaran === route.params.id) 
        albaran[foundIndex].products = products;
        await AsyncStorage.setItem('albaran', JSON.stringify(albaran))
    }
    products.forEach(element => {
        let valueArr = products.map(function (item) { return item.name_product })
        let duplicates = valueArr.filter((item, index) => valueArr.indexOf(item) !== index)
        if (!duplicates.includes(element.name_product)) {
            this.state.tableData.push([<Icon name='check' size={30} style={{ alignSelf: 'center' }} color='green' />, element.name_product, element.quantity, <TouchableOpacity onPress={() => { deleteAlbaran(element.id_product) }} id={3}><Icon name='remove' size={30} style={{ alignSelf: 'center' }} color='red' /></TouchableOpacity>])
        } else {
            this.state.tableData.push([<Icon name='warning' size={30} style={{ alignSelf: 'center' }} color='yellow' />, element.name_product, element.quantity, <TouchableOpacity onPress={() => { deleteAlbaran(element.id_product) }}><Icon name='remove' size={30} style={{ alignSelf: 'center' }} color='red' /></TouchableOpacity>])
        }
    });
    useFocusEffect(
        useCallback(() => {
            insertItems()
        }, [])
    )
    return (
        <View>
            <Row data={state.tableHead} style={productStyle.head} textStyle={productStyle.text} />
            <Rows data={state.tableData} textStyle={productStyle.text} style={productStyle.rowStyle} />
        </View>
    )
}



export default ProductComponent;