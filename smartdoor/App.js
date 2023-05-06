import * as React from "react";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "./screens/Login";
import Password from "./screens/Password";

import Home from "./screens/Home";
import Info from "./screens/Info";
import ChangePW from "./screens/ChangePW";

import AccessHistory from "./screens/AccessHistory";
import DetailAccessHistory from "./screens/DetailAccessHistory";
import User from "./screens/User";
import DetailUser from "./screens/DetailUser";
import DetailAdmin from "./screens/DetailAdmin";
import NewUser from "./screens/NewUser";
import EditUser from "./screens/EditUser";
import Door from "./screens/Door";
import DetailDoor from "./screens/DetailDoor";
import NewDoor from "./screens/NewDoor";
import EditDoor from "./screens/EditDoor";

const Tab = createBottomTabNavigator();

const HistoryStack = createNativeStackNavigator();

function LoginStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="Login" component={Login} />
      <HistoryStack.Screen name="Password" component={Password} />
      <HistoryStack.Screen name="Main" component={Screen} />
    </HistoryStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="Homes" component={Home} />
      <HistoryStack.Screen name="DetailAdmin" component={DetailAdmin} />
      <HistoryStack.Screen name="Change" component={ChangePW} />
    </HistoryStack.Navigator>
  );
}

function InfoStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="Home" component={Info} />
    </HistoryStack.Navigator>
  );
}

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="Home" component={AccessHistory} />
      <HistoryStack.Screen name="Details" component={DetailAccessHistory} />
    </HistoryStack.Navigator>
  );
}

function UserStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="Home" component={User} />
      <HistoryStack.Screen name="Details" component={DetailUser} />
      <HistoryStack.Screen name="Add" component={NewUser} />
      <HistoryStack.Screen name="Edit" component={EditUser} />

    </HistoryStack.Navigator>
  );
}

function DoorStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="Home" component={Door} />
      <HistoryStack.Screen name="Details" component={DetailDoor} />
      <HistoryStack.Screen name="Add" component={NewDoor} />
      <HistoryStack.Screen name="Edit" component={EditDoor} />

    </HistoryStack.Navigator>
  );
}

function Screen(){
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "home"
                : "home-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "User") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Lock") {
              iconName = focused ? "lock-closed" : "lock-closed-outline";
            } else if (route.name === "Info") {
              iconName = focused ? "ios-information-circle"
              : "ios-information-circle-outline";
            }

            // You can return any component that you like here! 

            return (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name={iconName} color={color} size={size} />
                </View>
              </>
            );
          },
          tabBarInactiveTintColor: "black",
          headerStyle: {
            height: 140,
          },
          tabBarStyle: {
            height: 80,
            paddingBottom: 16,
          },
          headerTitleStyle: { fontSize: 34,fontWeight: "500",},
        })}
      >
        
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="History" component={HistoryStackScreen} />
        <Tab.Screen name="User" component={UserStackScreen} />
        <Tab.Screen name="Lock" component={DoorStackScreen} />
        <Tab.Screen name="Info" component={InfoStackScreen} tabBarButton={() => {}}/>
      </Tab.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <HistoryStack.Navigator>
        <HistoryStack.Screen
        name="LoginStack"
        component={LoginStackScreen}
        options={{ headerShown: false }}
      />
      <HistoryStack.Screen
        name="Main"
        component={Screen}
        options={{ headerShown: false }}
      />
      
    </HistoryStack.Navigator>  
  </NavigationContainer>
  )
  
}
     