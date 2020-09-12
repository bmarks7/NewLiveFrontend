import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import MainLord from '../screens/MainLord'
import TenOrLord from '../screens/TenOrLord'
import MainTen from '../screens/MainTen'
import newProp from '../screens/NewProp'
import PropDetails from '../screens/PropDetails'
import PropDetailsBuy from '../screens/PropDetailsBuy'
import HitterInfo from '../screens/HitterInfo'

const screens = {
    Home: {
        screen: Home
    },
    SignUp:{
        screen: SignUp
    },
    SignIn:{
        screen: SignIn
    },
    TenOrLord:{
        screen: TenOrLord
    },
    MainTen:{
        screen:MainTen
    },
    MainLord:{
        screen: MainLord
    },
    
    NewProp:{
        screen: newProp
    },
    PropDetails:{
        screen: PropDetails
    },
    PropDetailsBuy:{
        screen: PropDetailsBuy
    },
    HitterInfo:{
        screen: HitterInfo
    }

}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)