import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import FavoritesScreen from "@screens/FavoritesScreen";
import BooksScreen from "@screens/BooksScreen";
import BookDetailsScreen from "@screens/BookDetailsScreen";
import TabNavigator from "./TabNavigation";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={TabNavigator} />
    <Stack.Screen
      name={routes.BOOK_DETAILS.name}
      component={BookDetailsScreen}
      options={{
        headerShown: true,
        title: routes.BOOK_DETAILS.title,
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
