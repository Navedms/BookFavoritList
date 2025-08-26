import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "./routes";

// Screens
import BooksScreen from "@screens/BooksScreen";
import FavoritesScreen from "@screens/FavoritesScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.BOOKS.name}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 2,
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        name={routes.BOOKS.name}
        component={BooksScreen}
        options={{
          title: routes.BOOKS.title,
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused
              ? routes.BOOKS.activeIcon
              : routes.BOOKS.icon;
            return (
              <MaterialCommunityIcons
                name={iconName}
                style={
                  focused && {
                    transform: [{ scaleX: -1 }],
                  }
                }
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={routes.FAVORITES.name}
        component={FavoritesScreen}
        options={{
          title: routes.FAVORITES.title,
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused
              ? routes.FAVORITES.activeIcon
              : routes.FAVORITES.icon;
            return (
              <MaterialCommunityIcons
                name={iconName}
                style={
                  focused && {
                    transform: [{ rotate: "-20deg" }],
                  }
                }
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
