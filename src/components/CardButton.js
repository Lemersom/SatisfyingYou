import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Card das carinhas
const CardButton = (props) => {
    const containerStyle = {
        padding: props.padding || 25
    }

    const subtitleStyle = {
        fontSize: props.fontSize || 28
    }

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={props.onPress}>
            <Icon name={props.name} size={props.size} color={props.color} />
            <Text style={[styles.Subtitle, subtitleStyle]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Subtitle:{
        paddingTop: '1%',
        justifyContent: 'center',
        fontFamily: 'AveriaLibre-Regular',
        color: '#FFFFFF', 
    },
    container:{
        alignItems: 'center',
    }
})
export default CardButton