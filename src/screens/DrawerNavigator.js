import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";

import Home from "./Home";

const Drawer = createDrawerNavigator()

//Criar a stack do drawer com a home e chama o customDrawer
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />} 
            screenOptions={{
                headerTitle: "",
                drawerStyle: {backgroundColor: "#2B1F5C"},
                drawerActiveBackgroundColor: "#2B1F5C",
                drawerLabelStyle: {color: "#FFFFFF"},
                headerStyle: {backgroundColor: "#2B1D62", height: 40},
                headerTintColor: "#FFFFFF"
            }}>
            <Drawer.Screen name="Home" component={Home}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator