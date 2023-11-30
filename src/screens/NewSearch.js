import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useState, useContext } from 'react';
import { launchImageLibrary } from 'react-native-image-picker'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Form from '../components/Form';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import { storage } from '../config/firebaseConfig';

import { db } from '../config/firebaseConfig'
import { addDoc, collection} from 'firebase/firestore';
import AppContext from '../config/context';

const NewSearch = (props) => {
    const [txtName, setName] = useState('');
    const [txtDate, setDate] = useState(null);
    const [urlImage, setUrlImage] = useState(null);
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessageDate, setErrorMessageDate] = useState('');

    const context = useContext(AppContext)

    const onDateSelected = (selectedDate) => {
        setDate(selectedDate); 
    };

    const isNameValid = () => {
        return txtName !== "";
    };

    const isDateValid = () => {
        return txtDate !== null;
    }

    const registerSearch = async () => {
        if(!isNameValid() && !isDateValid()) {
            setErrorMessageName("Preencha o nome da pesquisa");
            setErrorMessageDate("Preencha a data");
        } else if (!isNameValid()) {
            setErrorMessageName("Preencha o nome da pesquisa");
            setErrorMessageDate(null);
        } else if (!isDateValid()) {
            setErrorMessageDate("Preencha a data");
            setErrorMessageName("");
        } else {
            
            const imageRef = ref(storage, `${txtName}-${txtDate.replace(/\//g, '-')}.jpeg`)
            const file = await fetch(urlImage)
            const blob = await file.blob()

            uploadBytes(imageRef, blob, {contentType: 'image/jpeg'} )
                .then(
                    (result) => {
                        getDownloadURL(imageRef)
                            .then(
                                async (url) => {
                                    try {
                                        const docRef = await addDoc(collection(db, context.email), {
                                            name: txtName,
                                            date: txtDate,
                                            image: url,
                                            Pessimo: 0,
                                            Ruim: 0,
                                            Neutro: 0,
                                            Bom: 0,
                                            Excelente: 0
                                        })
                                        console.log(`Document written with ID: ${docRef.id}`)
                                    }
                                    catch (e) {
                                        console.log(`Error adding document: ${e}`)
                                    }
                        
                                    props.navigation.pop();
                                    setErrorMessageName("");
                                    setErrorMessageDate(null);
                                }
                            )
                            .catch(
                                (error) => {
                                    console.log('erro de referencia de imagem')
                                }
                            )
                    }
                )
                .catch(
                    (error) =>{
                        console.log("Error")
                    }
                )    

        }
    };

    const openLibrary = () => {
        launchImageLibrary()
            .then((result) => {
                setUrlImage(result.assets[0].uri)
            })
            .catch((error) => {
                console.log(`Erro ao carregar imagem ${JSON.stringify(error)}`)
            })
    }

    return(
        <View style={style.rootContainer}>
            <View style={style.formContainer}>
                <Form 
                    text="Nome" 
                    value={txtName} 
                    onChangeText={setName}
                    keyboardType="default" 
                    placeholder="" 
                    secureTextEntry={false}/>
                
                <ErrorMessage style={style.errorMessage} errorMessage={errorMessageName} />

                <Form 
                    text="Data" 
                    keyboardType="default" 
                    placeholder="" 
                    width={450}
                    secureTextEntry={false}
                    onDateSelected={onDateSelected}
                    isDate={true}/>

                <ErrorMessage style={style.errorMessage} errorMessage={errorMessageDate} />

                <View style={style.imageContainer}>
                    <TouchableOpacity style={style.button} onPress={openLibrary}>
                        { urlImage ? (
                            <Image resizeMode='contain' style={style.image} source={{uri: urlImage}}></Image>
                        ): (
                            
                                <Text style={style.text}>Câmera/Galeria de imagens</Text>
                        
                        )
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <Button onPress={registerSearch} text="CADASTRAR"/>
        </View>
    )
};

const style = StyleSheet.create({
    rootContainer: {
        backgroundColor: '#372775',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        justifyContent: 'flex-start'
    },
    formContainer: {
    },
    imageContainer: {
        backgroundColor: '#FFFFFF',
        width: 270,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 10
    },
    image: {
        width: 270,
        height: 75
    },
    button: {
        justifyContent: 'center',
    },
    text: {
        color: '#939393',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',
        fontSize: 16
    }
});

export default NewSearch;