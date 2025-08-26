import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "@store/store";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "@navigation/rootNavigation";
import { getNavigationTheme } from "@navigation/navigationTheme";
import AppNavigator from "@navigation/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            ref={navigationRef}
            theme={getNavigationTheme("light")}
          >
            <AppNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
