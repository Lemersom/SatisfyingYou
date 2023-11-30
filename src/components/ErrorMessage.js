import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = (props) => {
    return(
        <Text style={style.errorMessage}>{props.errorMessage}</Text>
    )
};

const style = StyleSheet.create({
    errorMessage: {
        color: '#FD7979',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 12
    }
});

export default ErrorMessage;