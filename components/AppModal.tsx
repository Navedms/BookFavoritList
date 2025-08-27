import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useColors from "@hooks/useColors";
import Button from "./Button";

interface AppModal {
  children: React.ReactNode;
  animationType?: "none" | "slide" | "fade";
  transparent?: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  closeBtnText?: string;
  closeBtnbackgroundColor?: string;
  style?: ViewStyle;
  onCloseModal?: () => void;
  disabled?: boolean;
}

function AppModal({
  children,
  animationType = "fade",
  transparent = true,
  visible,
  closeBtnText = "close",
  closeBtnbackgroundColor = "darkMedium",
  setVisible,
  onCloseModal,
  disabled = false,
  style,
}: AppModal) {
  const colors = useColors();
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={() => {
        onCloseModal && onCloseModal();
        setVisible(!visible);
      }}
    >
      <View
        style={[styles.fullscreen, { backgroundColor: colors.opacityBlack }]}
      >
        <TouchableOpacity
          onPress={() => {
            if (!disabled) {
              onCloseModal && onCloseModal();
              setVisible(!visible);
            }
          }}
          style={styles.closeTitleBtn}
        >
          <MaterialCommunityIcons name="close" size={30} color={colors.white} />
        </TouchableOpacity>
        <View
          style={[styles.container, { backgroundColor: colors.white }, style]}
        >
          <View style={styles.children}>{children}</View>
          {!disabled && (
            <View style={styles.closeBtn}>
              <Button
                title={closeBtnText}
                backgroundColor={closeBtnbackgroundColor}
                onPress={() => {
                  onCloseModal && onCloseModal();
                  setVisible(!visible);
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  container: {
    top: "5%",
    left: "5%",
    width: "90%",
    height: "85%",
    borderRadius: 10,
    padding: 15,
  },
  closeTitleBtn: {
    top: Platform.OS === "android" ? 35 : 40,
    left: Platform.OS === "android" ? -4 : 6,
  },
  children: {
    flex: 1,
    zIndex: 1,
  },
  closeBtn: {
    width: "100%",
  },
});

export default AppModal;
