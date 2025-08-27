import showMessageApp from "./showMessage";

const showError = (msg: string, color: string) => {
  return showMessageApp(msg, "danger", color);
};

export default showError;
