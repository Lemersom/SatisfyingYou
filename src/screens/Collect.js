import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardButton from '../components/CardButton';
import { useContext, useState, useEffect } from 'react'
import { db } from '../config/firebaseConfig'
import AppContext from '../config/context';
import { doc, updateDoc } from 'firebase/firestore';


//Coletar votos
const Collect = (props) => {
    const context = useContext(AppContext);    
    const [counters, setCounters] = useState(context.currentCounters || {
      Pessimo: 0,
      Ruim: 0,
      Normal: 0,
      Bom: 0,
      Excelente: 0,
    });

    const buttonClick = (satisfaction) => {
      setCounters((prevCounters) => {
        if (!prevCounters) {
          console.error('Erro: prevCounters é undefined.');
          return prevCounters;
        }
  
        const updatedCounters = {
          ...prevCounters,
          [satisfaction]: (prevCounters[satisfaction] || 0) + 1,
        };
  
        const docRef = doc(db, context.email, context.currentResearchId);
        updateDoc(docRef, updatedCounters);

        return updatedCounters;
      });
    };
  
    useEffect(() => {
      try {
        if (context) {
          const docRef = doc(db, context.email, context.currentResearchId);
          context.setCurrentCounters(counters);
          updateDoc(docRef, counters);
          console.log('Documento atualizado com sucesso.');
        } else {
          console.error('Erro: context ou context.currentCounters é undefined.');
        }
      } catch (error) {
        console.error('Erro ao atualizar documento:', error);
      }
    }, [counters, context]);
      
    const exitCollect = () => {
        props.navigation.pop();
    };

    const gotoThanks = () => {
        props.navigation.navigate("Agradecimento")
    }

    return (
        <View style={styles.MainView}>
            <View style={styles.ExitContainer}>
                <TouchableOpacity style={styles.ExitButton} onPress={exitCollect}></TouchableOpacity>
            </View>

            <View style={styles.TextView}>
                <Text style={styles.Text}>O que você achou do Carnaval 2024?</Text>
            </View>
            <View style={styles.SatisfationView}>
                <CardButton name='emoticon-dead-outline' color='#d71616' text="Péssimo" size={100} onPress={() => { gotoThanks(); buttonClick('Pessimo') }} />
                <CardButton name='emoticon-sad-outline' color='#ff360a' text="Ruim" size={100} onPress={() => { gotoThanks(); buttonClick('Ruim') }} />
                <CardButton name='emoticon-neutral-outline' color='#ffc632' text="Neutro" size={100} onPress={() => { gotoThanks(); buttonClick('Neutro') }} />
                <CardButton name='emoticon-happy-outline' color='#37bd6d' text="Bom" size={100} onPress={() => { gotoThanks(); buttonClick('Bom') }} />
                <CardButton name='emoticon-excited-outline' color='#25bc22' text="Excelente" size={100} onPress={() => { gotoThanks(); buttonClick('Excelente') }} />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    MainView: {
        backgroundColor: '#372775',
        flex: 1,
    },
    ExitContainer: {
        alignItems: 'flex-end',
        width: '100%',
        height: 40
    },
    ExitButton: {
        width: 40,
        height: 40
    },
    SatisfationView: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '3%'
    },
    TextView: {
        alignItems: 'center',
        paddingTop: 10
    },
    Text: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 35,
        color: '#FFFFFF',
    },
})

export default Collect;