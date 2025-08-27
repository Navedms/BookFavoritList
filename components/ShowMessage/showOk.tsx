import showMessageApp from "./showMessage";

const showOk = (msg: string, color: string) => {
  return showMessageApp(msg, "success", color);
};

export default showOk;
