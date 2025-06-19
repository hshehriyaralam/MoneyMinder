import { createContext, useContext, useState } from "react";
import Alert from "../Components/AlertComponents/Alert.jsx";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "info",
    progress: 100,
  });

  const showAlert = (type, message, duration = 3000) => {
    setAlert({ visible: true, type, message, progress: 100 });

    let interval;
    const step = 100 / (duration / 50); // 50ms interval

    interval = setInterval(() => {
      setAlert((prev) => {
        if (prev.progress <= 0) {
          clearInterval(interval);
          return { ...prev, visible: false };
        }
        return { ...prev, progress: prev.progress - step };
      });
    }, 50);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
          <Alert
            type={alert.type}
            message={alert.message}
            progress={alert.progress}
            onClose={() => setAlert({ visible: false, message: "", type: "info", progress: 0 })}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
