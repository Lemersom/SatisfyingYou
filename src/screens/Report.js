import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { useContext, useEffect, useState } from 'react'
import AppContext from '../config/context';

const Report = () => {

    const context = useContext(AppContext)
    const [currentCounters, setCurrentCounters] = useState(context.currentCounters)
    const data = [
        {
            key: 'Péssimo',
            value: currentCounters.Pessimo,
            svg: { fill: '#53D8D8' }
        },
        {
            key: 'Ruim',
            value: currentCounters.Ruim,
            svg: { fill: '#EA7288' }
        },
        {
            key: 'Neutro',
            value: currentCounters.Neutro,
            svg: { fill: '#5FCDA4' }
        },
        {
            key: 'Bom',
            value: currentCounters.Bom,
            svg: { fill: '#6994FE' }
        },
        {
            key: 'Excelente',
            value: currentCounters.Excelente,
            svg: { fill: '#F1CE7E' }
        }
    ]

    let maiorVoto = data[0];
    for (const item of data) {
        if (item.value > maiorVoto.value) {
            maiorVoto = item;
        }
    }

    //Destacando a parte do gráfico com mais voto
    maiorVoto.arc = { outerRadius: '115%', cornerRadius: 0 };

    return (
        <View style={styles.MainView}>
            <View style={styles.BodyView}>
                <View style={styles.ImageView}>
                    <PieChart
                        style={{ height: 300, width: 300 }}
                        outerRadius={'70%'}
                        innerRadius={10}
                        data={data}/>
                </View>

                <View style={styles.LegendView}>
                    <View style={styles.Legend}>
                        <View style={[styles.Square, {backgroundColor: '#F1CE7E'}]}></View>
                        <Text style={styles.Text}>Excelente</Text>
                    </View>
                    <View style={styles.Legend}>
                        <View style={[styles.Square, {backgroundColor: '#6994FE'}]}></View>
                        <Text style={styles.Text}>Bom</Text>
                    </View>
                    <View style={styles.Legend}>
                        <View style={[styles.Square, {backgroundColor: '#5FCDA4'}]}></View>
                        <Text style={styles.Text}>Neutro</Text>
                    </View>
                    <View style={styles.Legend}>
                        <View style={[styles.Square, {backgroundColor: '#EA7288'}]}></View>
                        <Text style={styles.Text}>Ruim</Text>
                    </View>
                    <View style={styles.Legend}>
                        <View style={[styles.Square, {backgroundColor: '#53D8D8'}]}></View>
                        <Text style={styles.Text}>Péssimo</Text>
                    </View>
                </View>

            </View>  

        </View>
    )
}

const styles = StyleSheet.create({
    MainView:{
        flex: 1 
    },
    BodyView:{
        backgroundColor: '#372775',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1
    },
    ImageView:{
        justifyContent: 'center',
        width: 380
    },
    Image:{
        width: 300,
        height: 300,
        flex: 1
    },
    LegendView:{
        justifyContent: 'center'
    },
    Legend:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    Square:{
        width: 32, 
        height: 32
    },
    Text:{
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 32,
        color: '#FFFFFF',
        marginStart: 10
    }
})

export default Report;