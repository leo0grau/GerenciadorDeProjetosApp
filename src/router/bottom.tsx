import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomePage from '../pages/home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarioPage from '../pages/calendario';
import PerfilPage from '../pages/perfil';
import ProjetosPage from '../pages/projetos';
import {TouchableOpacity, View} from 'react-native';
import AddProjetoPage from '../pages/addProjeto';
const Tab = createBottomTabNavigator();
type IconeProps = {
  route: any;
  focused: boolean;
  color: string;
  size: number;
};

// const Icone = ({route, focused, color, size}: IconeProps) => {
//   let iconName: string = '';

//   switch (route.name) {
//     case 'HomePage':
//       iconName = focused ? 'home' : 'home-outline';
//       break;

//     case 'CalendarioPage':
//       iconName = focused ? 'calendar' : 'calendar-outline';
//       break;

//     case 'ProjetosPage':
//       iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
//       break;

//     case 'PerfilPage':
//       iconName = focused ? 'person' : 'person-outline';
//       break;
//   }

//   // You can return any component that you like here!
//   return <Ionicons name={iconName} size={size} color={color} />;
// };

const PlusButtom = ({children, onPress}: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'black',
        borderRadius: 100,
        width: 60,
        height: 60,
        top: -25,
        borderWidth: 2,
        borderColor: 'white',
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarIcon: ({focused, color, size}) => {
        //   return (
        //     <Icone focused={focused} color={color} size={size} route={route} />
        //   );
        // },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          elevation: 0,
          backgroundColor: 'black',
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.44)',
      })}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={25}
                color={focused ? 'white' : 'rgba(255, 255, 255, 0.44)'}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CalendarioPage"
        component={CalendarioPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
                size={25}
                color={focused ? 'white' : 'rgba(255, 255, 255, 0.44)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddProjetoPage"
        component={AddProjetoPage}
        options={{
          tabBarButton: props => <PlusButtom {...props} />,

          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'add' : 'add-outline'}
              size={25}
              color={'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProjetosPage"
        component={ProjetosPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name={focused ? 'file-tray-full' : 'file-tray-full-outline'}
                size={25}
                color={focused ? 'white' : 'rgba(255, 255, 255, 0.44)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PerfilPage"
        component={PerfilPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={25}
                color={focused ? 'white' : 'rgba(255, 255, 255, 0.44)'}
              />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
