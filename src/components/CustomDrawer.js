import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AppContext from '../config/context'

//Drawer da home - parte de design
const CustomDrawer = (props) => {

    const context = useContext(AppContext)

    const logout = () => {
        props.navigation.popToTop()
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, paddingBottom: 20, paddingTop: 20}}>
            
            <Text style={styles.Text}>{context.email}</Text>

            <View style={styles.Divider}></View>

            <View style={styles.MenuView}>
                <TouchableOpacity style={styles.SearchView} onPress={() => props.navigation.navigate("Home")}>
                    <Icon name='document-text-outline' size={42} color='#FFFFFF'/>
                    <Text style={styles.Text}>Pesquisas</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity style={styles.ExitView} onPress={logout}>
                    <Icon name='log-out-outline' size={42} color='#FFFFFF'/>
                    <Text style={styles.Text}>Sair</Text>
                </TouchableOpacity>
            </View>

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    MenuView:{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    SearchView:{
        flexDirection: 'row'
    },
    ExitView:{
        flexDirection: 'row',
        paddingLeft: 5
    },
    Divider:{
        backgroundColor: 'red',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 2,
        marginHorizontal: 20,
        marginVertical: 20
    },
    Text:{
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 26,
        color: '#FFFFFF',
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingHorizontal: 5
    }
})

export default CustomDrawer;