import { View, Text, StyleSheet} from 'react-native';
import CardAction from '../components/CardAction';
import React, { useContext, useEffect } from 'react';
import AppContext from '../config/context';

const SearchAction = (props) => {

    const context = useContext(AppContext)

    const modify = () => {
        props.navigation.navigate("Modificar Pesquisa");
    };
    
    const collect = () => {
        props.navigation.navigate("Coleta");
    };
    
    const report = () => {
        props.navigation.navigate("Relatório");
    };
    
    useEffect(() => {
        props.navigation.setOptions({headerTitle: context.currentResearchName})
    }, [context.currentResearchName])
    
    return(
        <View style={styles.MainView}>
            <CardAction iconRepo='Entypo' name='new-message' text='Modificar' onPress={modify}/>
            <CardAction iconRepo='IconMaterialCommunityIcons' name='checkbox-multiple-outline' text='Coletar dados' onPress={collect}/>
            <CardAction iconRepo='Entypo' name='circular-graph' text='Relatório' onPress={report}/>
        </View>
    )
}


const styles = StyleSheet.create({
    MainView:{
        backgroundColor: '#372775',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
})

export default SearchAction;