import { useState } from "react";
import Alert from "./Alert.jsx";

const useAlert = () => {
  const [alertData, setAlertData] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const showAlert = (type, message, duration = 3000) => {
    setAlertData({ visible: true, type, message });

    setTimeout(() => {
      setAlertData({ visible: false, message: "", type: "info" });
    }, duration);
  };

  const AlertComponent = alertData.visible ? (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <Alert
        type={alertData.type}
        message={alertData.message}
        onClose={() => setAlertData({ visible: false, message: "", type: "info" })}
      />
    </div>
  ) : null;

  return { showAlert, AlertComponent };
};


export{useAlert}