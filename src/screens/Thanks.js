import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useEffect } from 'react';

const Thanks = (props) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.navigation.pop();
        }, 3000);
        return () => clearTimeout(timer);
      }, []);

    return(
        <View style={styles.MainView}>
            <TouchableOpacity style={styles.Hidden} onPress={() => props.navigation.pop()}></TouchableOpacity>

            <View style={styles.TextView}>
                <Text style={styles.Text}>Obrigado por participar da pesquisa!</Text>
                <Text style={styles.Text}>Aguardamos você no próximo ano!</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    MainView:{
        backgroundColor: '#372775',
        flex: 1
    },
    Hidden:{
        width: 50,
        height: 50,
        alignSelf: 'flex-end'
    },
    TextView:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20
    },
    Text:{
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 42,
        color: '#FFFFFF',
        paddingBottom: 30
    }
})

export default Thanks;