import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

//Card da tela home
const CardHome = (props) => {
    return (
        <View style={styles.Card}>
            <TouchableOpacity style={styles.CardOption} onPress={props.onPress}>
                <Image resizeMode='contain' style={styles.Image} source={props.source}/>
                <Text style={styles.Title}>{props.title}</Text>
                <Text style={styles.Subtitle}>{props.subtitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Title:{
        paddingTop: '2%',
        justifyContent: 'center',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 25,
        color: '#3F92C5', 
    },
    Subtitle:{
        justifyContent: 'center',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 10,
        color: '#8B8B8B', 
    },
    CardOption:{
        borderRadius: 8,
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems: 'center',
        width: 200,
        height: 160,
        margin: 16
    },
    Image: {
        width: 50,
        height: 50
    }
})
export default CardHome