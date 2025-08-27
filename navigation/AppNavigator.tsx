import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import BookDetailsScreen from "@screens/BookDetailsScreen";
import TabNavigator from "./TabNavigation";
import useColors from "@hooks/useColors";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const colors = useColors();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name={routes.BOOK_DETAILS.name}
        component={BookDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: colors.light,
          },
          headerTitleStyle: { color: colors.black },
          headerBackTitleStyle: { color: colors.primary },
          headerTintColor: colors.primary,
          headerShown: true,
          title: routes.BOOK_DETAILS.title,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
