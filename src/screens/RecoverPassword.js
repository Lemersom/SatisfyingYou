import { View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import Form from '../components/Form';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import { auth } from '../config/firebaseConfig'
import { sendPasswordResetEmail, AuthErrorCodes } from 'firebase/auth';

const RecoverPassword = (props) => {
    const [txtEmail, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const recoverPassword = () => {
        sendPasswordResetEmail(auth, txtEmail)
            .then(() => {
                setErrorMessage("");
                Alert.alert("Sucesso", "E-mail de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada.")
                props.navigation.pop();
            })
            .catch((error) => {
                console.log(`Ocorreu um erro ao realizar o login: ${JSON.stringify(error)}`)
                if(error.code == AuthErrorCodes.INVALID_EMAIL) {
                    setErrorMessage("E-mail inválido.");
                } else if(error.code == "auth/missing-email") {
                    setErrorMessage("Digite um e-mail");
                }
            });
    };

    return(
        <View style={style.rootContainer}>
            <View style={style.formContainer}>
                <Form 
                    text="E-mail" 
                    value={txtEmail} 
                    onChangeText={setEmail}
                    keyboardType="email-address" 
                    placeholder="email@gmail.com" 
                    secureTextEntry={false}/>

                <ErrorMessage style={style.errorMessage} errorMessage={errorMessage} />
            </View>

            <Button onPress={recoverPassword} text="RECUPERAR"/>
        </View>
    )
};

const style = StyleSheet.create({
    rootContainer: {
        backgroundColor: '#372775',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        marginBottom: 10
    },
    errorMessage: {
        justifyContent: 'flex-start'
    }
});

export default RecoverPassword;