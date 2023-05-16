import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

//  Styles
import { albaranStyle } from '../styles/Styles';

export const AlbaranComponent = (props) => {

    state = {
        albaranes: []
    }

    const sentCheck = (value) => {
        if (value == true) {
            return (<View>
                <Icon 
                name='check'
                size={30}
                style={{alignSelf: 'center'}}
                />
            </View>)
        }
    }

    if (props.data.length > 0) {
        state.albaranes = []
        props.data.forEach(albaran => {
            state.albaranes.push([
                <TouchableOpacity onLongPress={() => { props.nav.navigation.navigate("EditAlbaranScreen", { ID: albaran.id_albaran }) }} style={albaranStyle.albaranTextContainer} onPress={() => { props.nav.navigation.navigate("AlbaranScreenDetail", { id: albaran.id_albaran }) }}>
                    <View>
                        <Text style={albaranStyle.albaranRegistry}>{albaran.registry}</Text>
                    </View>
                    <View>
                        <Text style={albaranStyle.albaranInnerText}>13/03/2023</Text>
                        <Text style={albaranStyle.albaranInnerText}>{albaran.code}</Text>
                    </View>
                    {sentCheck(albaran.sent)}
                    {/* <View>
                        <Icon 
                        name='check'
                        size={30}
                        style={{alignSelf: 'center'}}
                        />
                    </View> */}
                </TouchableOpacity>
            ])
        });
    } else {
        state.albaranes.push([[<Text style={albaranStyle.albaranEmptyText}>No hay albaranes para hoy...</Text>]])
    }
    return (
        <View>
            {state.albaranes}
        </View>
    )
}

export default AlbaranComponent;