import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Logo = ()=> {
    return(
        <View style={style.container}>
            <Text style={style.title}>Satisfying.you</Text>
            <Icon style={style.icon} name="emotsmile" size={32} color="#FFFFFF"/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 32,
        color: '#FFFFFF',
        marginRight: 15
    },
    icon: {
        marginTop: 5
    }
})

export default Logo;