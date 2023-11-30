import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = (props) => {
    
    return (
        <View style={style.container}>
            <Icon style={style.iconInput} name="search" size={30} color='#8B8B8B'/>
            <TextInput
                style={style.textInput}
                value={props.value}
                onChangeText={props.onChangeText} 
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                placeholderTextColor='#8B8B8B'/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    iconInput:{
        backgroundColor: '#FFFFFF',
        padding: 0.5
    },
    textInput: {
        paddingBottom: 7,
        backgroundColor: '#FFFFFF',
        height: 32,
        width: 730,
        paddingHorizontal: 4,
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 15,
        textAlign: 'left',
        color: '#3F92C5'
    }
})

export default SearchBar;