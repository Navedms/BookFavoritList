import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";

interface Props {
  setIsReady: (value: boolean) => void;
}

const SplashScreen = ({ setIsReady }: Props) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [apiCallFinished, setApiCallFinished] = useState(false);

  const firstInitialization = async () => {
    // api calls... await...
    setApiCallFinished(true);
  };

  useEffect(() => {
    if (animationFinished && apiCallFinished) {
      setIsReady(true);
    }
  }, [animationFinished, apiCallFinished]);

  useEffect(() => {
    firstInitialization();
  }, []);

  return (
    <View style={styles.container}>
      <Lottie
        source={require("@assets/animations/splash.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => setAnimationFinished(true)}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    zIndex: 10,
    height: "100%",
    width: "100%",
  },
});

export default SplashScreen;
