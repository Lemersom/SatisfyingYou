import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, Image,TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
import Form from '../components/Form';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import CardButton from '../components/CardButton';
import PopUp from '../components/PopUp';
import { PaperProvider } from 'react-native-paper';
import AppContext from '../config/context';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firebaseConfig';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ModifySearch = (props) => {
    const context = useContext(AppContext);

    const [txtName, setName] = useState(context.currentResearchName);
    const [txtDate, setDate] = useState(context.currentResearchDate);
    const [urlImage, setUrlImage] = useState(context.currentResearchImage)
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessageDate, setErrorMessageDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const isNameValid = () => {
        return txtName !== "";
    };

    const isDateValid = () => {
        return txtDate !== null;
    };

    const onDateSelected = (selectedDate) => {
        setDate(selectedDate);
    };

    const saveSearch = async () => {
        if (!isNameValid() && !isDateValid()) {
            setErrorMessageName("Preencha o nome da pesquisa");
            setErrorMessageDate("Preencha a data");
        } else if (!isNameValid()) {
            setErrorMessageName("Preencha o nome da pesquisa");
            setErrorMessageDate(null);
        } else if (!isDateValid()) {
            setErrorMessageDate("Preencha a data");
            setErrorMessageName("");
        } else {
            if(context.currentResearchImage != urlImage)
                await updateImageStorage()
            else
                await updateFirestore(urlImage)
            props.navigation.pop(2);
            setErrorMessageName("");
            setErrorMessageDate(null);
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

    const deleteResearch = async () => {
        try {
            await deleteDoc(doc(db, context.email, context.currentResearchId));

            const imgRef = ref(storage, context.currentResearchImage);
            await deleteObject(imgRef)
        } catch (error) {
            console.error('Erro ao excluir documento:', error);
        }

        props.navigation.pop(2);
    };

    const updateImageStorage = async () => {
        try {
            const imgRef = ref(storage, context.currentResearchImage);

            await deleteObject(imgRef)

            const imageRef = ref(storage, `${txtName}-${txtDate.replace(/\//g, '-')}.jpeg`)
            const file = await fetch(urlImage)
            const blob = await file.blob()

            uploadBytes(imageRef, blob, {contentType: 'image/jpeg'} )
                .then(
                    (result) => {
                        getDownloadURL(imageRef)
                            .then(async (url) => {
                                await updateFirestore(url)
                            })
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
        } catch (error) {
            console.error('Erro ao atualizar imagem:', error);
        }
    }

    const updateFirestore = async (url) => {
        try {
            const docRef = doc(db, context.email, context.currentResearchId);
            await updateDoc(docRef, {
                name: txtName,
                date: txtDate,
                image: url,
            });
            console.log('Documento atualizado com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar documento:', error);
        }
    }

    return (
        <PaperProvider>
            <PopUp
                visible={modalVisible}
                onDismiss={hideModal}
                cancelBtn={hideModal}
                confirmBtn={deleteResearch}
            />

            <View style={style.rootContainer}>
                <View style={style.formContainer}>
                    <Form
                        text="Nome"
                        value={txtName}
                        onChangeText={setName}
                        keyboardType="default"
                        placeholder=""
                        secureTextEntry={false}
                    />

                    <ErrorMessage style={style.errorMessage} errorMessage={errorMessageName} />

                    <Form
                        text="Data"
                        value={txtDate}
                        onChangeText={setDate}
                        keyboardType="default"
                        placeholder=""
                        width={450}
                        secureTextEntry={false}
                        onDateSelected={onDateSelected}
                        isDate={true}
                        date={new Date()}
                    />

                    <ErrorMessage style={style.errorMessage} errorMessage={errorMessageDate} />

                    <View style={style.imageContainer}>
                        <TouchableOpacity style={style.button} onPress={openLibrary}>
                            <Image resizeMode='contain' style={style.image} source={{uri: urlImage}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.footer}>
                    <Button onPress={saveSearch} text="SALVAR" />
                </View>
                <View style={style.trash}>
                    <CardButton name='trash-can-outline' color='#FFFFFF' text="Apagar" fontSize={14} padding={5} size={30} onPress={showModal} />
                </View>
            </View>
        </PaperProvider>
    );
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
        // marginBottom: 10
    },
    footer: {
        flexDirection: 'row'
    },
    buttonContainer: {
    },
    trash: {
        position: 'absolute',
        right: width * 0.03,
        bottom: height * 0.03
    },
    errorMessage: {
        justifyContent: 'flex-start'
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
        width: 250,
        height: 60
    },
});

export default ModifySearch;
