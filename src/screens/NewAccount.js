import { View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import Form from '../components/Form';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import { auth } from '../config/firebaseConfig'
import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';


const NewAccount = (props) => {
    const [txtEmail, setEmail] = useState('');
    const [txtPasswordOne, setPasswordOne] = useState('');
    const [txtPasswordTwo, setPasswordTwo] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');

    const isPasswordsEquals = () => {
        return (txtPasswordOne.localeCompare(txtPasswordTwo) === 0 && txtPasswordOne !== "" && txtPasswordTwo != "");
    };

    const isEmailValid = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(txtEmail);
    };

    const register = () => {
        if(isPasswordsEquals()) {
            setErrorMessagePassword("");
            setErrorMessageEmail("");
            createUserWithEmailAndPassword(auth, txtEmail, txtPasswordOne)
            .then((userCredential) => {
                console.log(userCredential)
                props.navigation.pop();
            })
            .catch((error) => {
                console.log(`Ocorreu um erro ao cadastrar o usuário: ${JSON.stringify(error)}`)
                if(error.code == AuthErrorCodes.INVALID_EMAIL) {
                    setErrorMessageEmail("E-mail parece ser inválido");
                } else if(error.code == "auth/missing-email") {
                    setErrorMessageEmail("Digite um e-mail");
                } else if(error.code == AuthErrorCodes.WEAK_PASSWORD) {
                    setErrorMessagePassword("Senha precisa ter pelo menos 6 caracteres.");
                }
            });
        } else if(!isEmailValid()) {
            setErrorMessageEmail("E-mail parece ser inválido");
            setErrorMessagePassword("O campo repetir senha difere da senha");
        } else {
            setErrorMessagePassword("O campo repetir senha difere da senha");
            setErrorMessageEmail("");
        }
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
                <ErrorMessage style={style.errorMessage} errorMessage={errorMessageEmail} />

                <Form 
                    text="Senha" 
                    value={txtPasswordOne} 
                    onChangeText={setPasswordOne} 
                    keyboardType="default" 
                    placeholder="********" 
                    secureTextEntry={true}/>
                
                <Form 
                    text="Repetir senha" 
                    value={txtPasswordTwo} 
                    onChangeText={setPasswordTwo} 
                    keyboardType="default" 
                    placeholder="" 
                    secureTextEntry={true}/>

                <ErrorMessage style={style.errorMessage} errorMessage={errorMessagePassword} />
            </View>

            <Button onPress={register} text="CADASTRAR"/>
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

export default NewAccount;