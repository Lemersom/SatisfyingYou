import { View, Text, StyleSheet, ScrollView} from 'react-native';
import CardHome from '../components/CardHome';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { useContext, useEffect, useState } from 'react'

import { db } from '../config/firebaseConfig'
import { collection, query, onSnapshot } from 'firebase/firestore';
import AppContext from '../config/context';

const Home = (props) => {
    const context = useContext(AppContext)

    const [cards, setCards] = useState([])
    const [cardsDisplayed, setCardsDisplayed] = useState([])
    const [inputTxt, setInputTxt] = useState('')
    
    const clickCard = (card) => {
        context.setCurrentResearchId(card.id)
        context.setCurrentResearchName(card.name)
        context.setCurrentResearchDate(card.date)
        context.setCurrentResearchImage(card.image)
        context.setCurrentCounters(card.counters)
        props.navigation.navigate("SearchAction");
    };

    const newSearch = () => {
        props.navigation.navigate("Nova Pesquisa");
    };

    const queryCards = async () => {
        const q = query(collection(db, context.email))
            
        const snapshot = onSnapshot(q, (querySnapshot) => {
            const researchs = []
            querySnapshot.forEach((doc) => {
                researchs.push(
                    {
                        id: doc.id,
                        name: doc.data().name,
                        date: doc.data().date,
                        image: doc.data().image,
                        counters: {
                            Pessimo: doc.data().Pessimo,
                            Ruim: doc.data().Ruim,
                            Neutro: doc.data().Neutro,
                            Bom: doc.data().Bom,
                            Excelente: doc.data().Excelente,
                        }
                    }
                )
            })
            console.log("Home", researchs)
            setCards(researchs)
        })
    }

    useEffect(() => {
        if(inputTxt){
            setCardsDisplayed(cards.filter((card) => card.name.toLowerCase().includes(inputTxt.toLowerCase())))
        }
        else{
            setCardsDisplayed(cards)
        }
    }, [inputTxt, cards])

    useEffect(() => {
        setInputTxt('')
        queryCards()
    }, [])

    return(
        <View style={styles.MainView}>
            <View style={styles.Bar}>
                <SearchBar
                    value={inputTxt}
                    onChangeText={(value) => setInputTxt(value)}
                    placeholder='Insira o termo de busca...'
                    secureTextEntry={false}/>
            </View>
            <ScrollView horizontal style={styles.Card}>
                {
                    cardsDisplayed ?
                    cardsDisplayed.map((card, index) => (
                        <CardHome 
                            key={index}
                            source={{uri: card.image}} 
                            title={card.name} 
                            subtitle={card.date}
                            onPress={() => clickCard(card)}/>
                    ))
                   :
                   null
                }
            </ScrollView>
            <View stye={styles.ButtonView}>
                <Button width={750} onPress={newSearch} text='NOVA PESQUISA'/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    MainView:{
        backgroundColor: '#372775',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 15
    },
    
    Bar:{
        marginTop: 15,
    }
})

export default Home;