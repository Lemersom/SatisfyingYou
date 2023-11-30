import { View, StyleSheet, Alert } from 'react-native';
import { useState, useContext } from 'react';
import Logo from '../components/Logo';
import Form from '../components/Form';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import AppContext from '../config/context';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';

const Login = (props) => {
    const { setEmail } = useContext(AppContext);
    const [txtEmail, setTxtEmail] = useState('')
    const [txtPassword, setTxtPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = () => {
        setErrorMessage("");
        signInWithEmailAndPassword(auth, txtEmail, txtPassword)
            .then((userCredential) => {
                setErrorMessage("");
                setEmail(txtEmail);
                setTxtEmail("")
                setTxtPassword("")
                props.navigation.navigate("DrawerNavigator")
            })
            .catch((error) => {
                console.log(`Ocorreu um erro ao realizar o login: ${JSON.stringify(error)}`)
                if(error.code == AuthErrorCodes.INVALID_EMAIL) {
                    setErrorMessage("E-mail inválido.");
                } else if(error.code == AuthErrorCodes.INVALID_PASSWORD) {
                    setErrorMessage("Senha inválida.");
                } else if(error.code == "auth/invalid-login-credentials") {
                    Alert.alert("Erro", "Credenciais digitadas não existe e/ou estão incorretas.")
                    setErrorMessage("");
                } else if(error.code == "auth/missing-password") {
                    setErrorMessage("Digite a senha");
                }
            });
    };

    const register = () => {
        props.navigation.navigate("Nova Conta");
    };

    const recoverPassword = () => {
        props.navigation.navigate("Recuperar Senha");
    };

    return(
        <View style={style.rootContainer}>
            <Logo/>
            <View style={style.formContainer}>
                <Form 
                    text="E-mail" 
                    value={txtEmail} 
                    onChangeText={setTxtEmail}
                    keyboardType="email-address" 
                    placeholder="email@gmail.com" 
                    secureTextEntry={false}/>

                <Form 
                    text="Senha" 
                    value={txtPassword} 
                    onChangeText={setTxtPassword} 
                    keyboardType="default" 
                    placeholder="********" 
                    secureTextEntry={true}/>

                <ErrorMessage style={style.errorMessage} errorMessage={errorMessage} />
            </View>

            <Button onPress={login} text="Entrar"/>
            <View style={style.buttonSmallContainer}>
                <Button onPress={register} text="Criar minha conta" height={25} textSize={14} backgroundColor="#419ED7"/>
                <Button onPress={recoverPassword} text="Esqueci minha senha" height={25} textSize={14} backgroundColor="#B5C7D1"/>
            </View>
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
        marginBottom: 6
    },
    buttonSmallContainer: {
        marginTop: 10
    },
    errorMessage: {
        justifyContent: 'flex-start'
    },
});

//Exportacao
export default Login;