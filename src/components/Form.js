import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/Ionicons';

const Form = (props) => {
    const textInputStyles = {
        height: props.height || 38,
        width: props.width || 500,
        textAlign: props.textAlign || 'left'
    };

    const containerStyles = {
        marginBottom: props.marginBottom || 5
    }

    const [date, setDate] = useState(null) //formato Date(yyyy-mm-dd) - timestamp
    const [dateString, setDateString] = useState('') //formato dd/mm/yyyy
    const [open, setOpen] = useState(false)

    const onConfirm = (selectedDate) => {
        setOpen(false)
        setDate(selectedDate)

        const formattedDate = formatDate(selectedDate)
        setDateString(formattedDate)

        if (props.onDateSelected) {
            props.onDateSelected(formattedDate);
        }
    }

    const onCancel = () => {
        setOpen(false)
    }

    const formatDate = (selectedDate) => {
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }

    useEffect(() => {
        if(props && props.value) {
            const [day, month, year] = props.value.split('/').map(Number);
            setDateString(props.value)
            setDate(new Date(year, month - 1, day))
        }
    }, [])

    return (
        <View style={[style.container, containerStyles]}>
            <Text style={style.text}>{props.text}</Text>
            {
                props.isDate === true ? (
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <View style={style.dateContainer}>
                            <TextInput
                                style={[style.textInput, textInputStyles]}
                                value={dateString}
                                editable={false}/>
                            <Icon style={style.icon} name="calendar-outline" size={24} color="black"/>
                        </View>
                    </TouchableOpacity>
                ) : (
                <TextInput
                    style={[style.textInput, textInputStyles]}
                    value={props.value}
                    onChangeText={props.onChangeText} 
                    keyboardType={props.keyboardType}
                    placeholder={props.placeholder}
                    secureTextEntry={props.secureTextEntry}
                    placeholderTextColor='#3F92C5'/>
                )
            }
            {props.isDate && open && (
                <DatePicker
                    modal
                    open={open}
                    mode='date'
                    date={date || new Date()}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                />
            )}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 14,
        textAlignVertical: 'center',
        color: '#3F92C5',
    },
    text: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 3
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 500, // Largura desejada (pode ser ajustada conforme necessário)
        backgroundColor: '#FFFFFF'
    },
    icon: {
        padding: 8, // Adicione preenchimento ao ícone para alinhar corretamente
    },
})

export default Form;