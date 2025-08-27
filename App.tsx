import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import FlashMessage from "react-native-flash-message";

// store
import { store } from "@store/store";

// navigation
import { navigationRef } from "@navigation/rootNavigation";
import { getNavigationTheme } from "@navigation/navigationTheme";
import AppNavigator from "@navigation/AppNavigator";
import AppSplashScreen from "@components/AppSplashScreen";

const queryClient = new QueryClient();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {isReady ? (
            <NavigationContainer
              ref={navigationRef}
              theme={getNavigationTheme("light")}
            >
              <AppNavigator />
            </NavigationContainer>
          ) : (
            <AppSplashScreen setIsReady={setIsReady} />
          )}

          <FlashMessage position="bottom" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
