import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Map from "../pages/map";
import { Ionicons } from "@expo/vector-icons";
import User from "../pages/user";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 16,
        },
        tabBarIconStyle: {
          color: "white",
        },
        tabBarStyle: { height: 60, backgroundColor: "#072960" },
        headerShown: false,
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={30} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="map"
        component={Map}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="map-outline" color={color} size={30} />
          ),
          tabBarLabel: "Mapa",
        }}
      />
      <Tab.Screen
        name="user"
        component={User}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={30} />
          ),
          tabBarLabel: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
