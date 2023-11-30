import "./ignoreWarnings";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Import screens
import Login from "./src/screens/Login";
import NewAccount from "./src/screens/NewAccount";
import RecoverPassword from "./src/screens/RecoverPassword";
import NewSearch from "./src/screens/NewSearch";
import ModifySearch from "./src/screens/ModifySearch";
import SearchAction from "./src/screens/SearchAction";
import Collect from "./src/screens/Collect";
import Report from "./src/screens/Report";
import Thanks from "./src/screens/Thanks";
import DrawerNavigator from "./src/screens/DrawerNavigator";
import { AppProvider } from "./src/config/context";

const Stack = createStackNavigator();

const defaultHeaderStyle = {
    height: 40,
    backgroundColor: '#2B1D62',
};

const defaultHeaderTitleStyle = {
    color: '#FFFFFF', // Defina a cor do texto do cabeçalho
    fontSize: 22,
    fontFamily: 'AveriaLibre-Regular',
};

const navigationScreenOptions = {
    headerStyle: defaultHeaderStyle,
    headerTitleStyle: defaultHeaderTitleStyle,
    headerTitleAlign: 'left',
    headerTintColor: '#573FBA'
};

const App = () => {
    return(
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Login"
                    screenOptions={navigationScreenOptions}>
                    <Stack.Screen 
                        name="Login" 
                        component={Login}
                        options={{headerShown: false}}/>
                    <Stack.Screen 
                        name="Nova Conta" 
                        component={NewAccount}/>
                    <Stack.Screen 
                        name="Recuperar Senha" 
                        component={RecoverPassword}
                        options={{headerTitle: "Recuperação de Senha"}}/>
                    <Stack.Screen 
                        name="Nova Pesquisa" 
                        component={NewSearch}/>
                    <Stack.Screen 
                        name="SearchAction" 
                        component={SearchAction}/>
                    <Stack.Screen 
                        name="Coleta" 
                        component={Collect}
                        options={{headerShown: false}}/>
                    <Stack.Screen 
                        name="Relatório" 
                        component={Report}/>
                    <Stack.Screen 
                        name="Modificar Pesquisa" 
                        component={ModifySearch}/>
                    <Stack.Screen 
                        name="Agradecimento"
                        component={Thanks}
                        options={{headerShown: false}}/>
                    <Stack.Screen 
                        name="DrawerNavigator"
                        component={DrawerNavigator}
                        options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    )
};

export default App;