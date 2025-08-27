import { showMessage, MessageType } from "react-native-flash-message";

import defaultStyle from "@config/style";

const showMessageApp = (
  msg: string,
  type: MessageType,
  backgroundColor: string
) => {
  return showMessage({
    message: msg,
    type: type,
    icon: { icon: "auto", position: "left" },
    backgroundColor: backgroundColor,
    titleStyle: defaultStyle.errorMsg,
    duration: 2000,
  });
};

export default showMessageApp;
