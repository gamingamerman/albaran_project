import { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlbaranComponent from '../components/Albaran';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

// Styles
import { mainScreen } from "../styles/Styles"

export const MainScreen = (props) => {

  const [albaranes, updateAlbaranes] = useState([])

  // Retrieve albaran data from internal storage
  const getData = async () => {
    try {
      const res = JSON.parse(await AsyncStorage.getItem('albaran'))
      updateAlbaranes(res)
      console.log(albaranes)
    } catch (e) {
      console.log(e)
    }
  }
  
  // Function that clears the data of albaran in the internal storage
  const clearAlbaranes = async () => {
    try {
      const res = JSON.parse(await AsyncStorage.clear('albaran'))
      updateAlbaranes([])
    } catch (e) {
      console.log(e)
    }
  }

  // Resets daily albaranes at 0 AM
  setInterval(
    function() {
      const d = new Date();
      if (d.getHours() == 0) {
        clearAlbaranes()
      }
    }, 5000
  )

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  )

  return (
    <View style={mainScreen.container}>
      <View style={mainScreen.topContainer}>
        <Icon.Button
          name='gear'
          size={60}
          backgroundColor='transparent'
          underlayColor='none'
          onPress={() => props.navigation.navigate('SettingsScreen')}
        />
      </View>
      <View style={mainScreen.addContainer}>
        <TouchableOpacity
          style={mainScreen.addBtn}
          onPress={() => props.navigation.navigate('FormScreen')}
        >
          <Icon
            name='plus'
            size={30}
            style={mainScreen.addIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={mainScreen.bodyContainer}>
        <View style={mainScreen.albaranContainer}>
          <ScrollView>
            <AlbaranComponent data={(albaranes !== null) ? albaranes : ''} nav={props} />
          </ScrollView>
        </View>
      </View>
      <View style={mainScreen.navContainer}>
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
            onPress={() => { }}
          />
        </View>
      </View>
    </View>
  )
}

export default MainScreen;