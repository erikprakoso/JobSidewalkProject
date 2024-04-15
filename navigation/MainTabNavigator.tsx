import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/Colors';


type TabParamsList = {
    Home: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamsList>();

const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: string = '';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: 'poppins-regular',
                },
                tabBarStyle: {
                    display: 'flex',
                },
                headerShown: false,
            })}
        >
            {/* Tambahkan tab screen untuk Home */}
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                }}
            />

            {/* Tambahkan tab screen untuk Profile */}
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
