import { View, Text, StyleSheet } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import Button from './Button';


const PopUp = (props) => {
    
    return (
        <Portal>
            <Modal 
                visible={props.visible} 
                onDismiss={props.onDismiss}
                contentContainerStyle={styles.Modal}>
            
                <View style={styles.TxtView}>
                    <Text style={styles.QuestionText}>Tem certeza que quer apagar essa pesquisa?</Text>
                </View>
                
                <View style={styles.BtnView}>
                    <Button 
                        text='SIM' 
                        textSize={36} 
                        height={71}
                        width={216}
                        backgroundColor='#FF8383'
                        onPress={props.confirmBtn}/>
                    
                    <Button 
                        text='CANCELAR' 
                        textSize={36} 
                        height={71}
                        width={216}
                        backgroundColor='#3F92C5'
                        onPress={props.cancelBtn}/>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    Modal:{
        backgroundColor: '#2B1F5C',
        width: 506,
        height: 253,
        alignSelf: 'center',
        padding: 20,
        justifyContent: 'space-around'
    },
    QuestionText:{
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 30,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    BtnView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default PopUp;