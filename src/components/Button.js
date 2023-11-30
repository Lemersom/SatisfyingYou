import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

const Button = (props) => {
    // Estilos personalizáveis
    const buttonStyles = {
        height: props.height || 38,
        width: props.width || 500,
        backgroundColor: props.backgroundColor || '#37BD6D',
    };

    const textStyles = {
        fontSize: props.textSize || 18, // Tamanho do texto padrão se não for especificado
    };

    return (
      <TouchableOpacity style={[style.button, buttonStyles]} onPress={props.onPress}>
        <Text style={[style.text, textStyles]}>{props.text}</Text>
      </TouchableOpacity>
      );
};

const style = StyleSheet.create({
    button: {
        margin: 5,
        justifyContent: 'center',
        shadowColor: "gray",
        shadowOffset: {
          width: 20,
          height: 6,
        },
        shadowOpacity: 1,
        elevation: 12,
    },
    text: {
      color: '#FFFFFF',
      fontFamily: 'AveriaLibre-Regular',
      textAlign: 'center'
    },
})

export default Button;