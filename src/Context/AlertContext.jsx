import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Alert from "../Components/AlertComponents/Alert.jsx";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const timeout = useRef(null);

  const dismiss = useCallback(() => {
    window.clearTimeout(timeout.current);
    setAlert(null);
  }, []);

  const showAlert = useCallback((type, message, duration = 3000) => {
    window.clearTimeout(timeout.current);
    setAlert({ type, message });
    timeout.current = window.setTimeout(() => setAlert(null), duration);
  }, []);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div className="toaster" aria-live="polite" aria-atomic="true">
          <Alert type={alert.type} message={alert.message} onClose={dismiss} />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
