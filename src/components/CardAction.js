import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Card do modify, voto e grafico
const CardAction = (props) => {
    return (
        <TouchableOpacity style={styles.CardOption} onPress={props.onPress}>
            {
                props.iconRepo == "Entypo" ?
                <IconEntypo name={props.name} size={100} color="#F9F9F9" />
                :
                <IconMaterialCommunityIcons name={props.name} size={100} color="#F9F9F9" />
            }
            
            <Text style={styles.Subtitle}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Subtitle:{
        paddingTop: '4%',
        justifyContent: 'center',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 26,
        color: '#FFFFFF', 
    },
    CardOption:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#312464',
        width: 210,
        height: 190,
    }
})
export default CardAction