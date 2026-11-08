import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const Alert = ({ type = "info", message, onClose }) => {
  const Icon = icons[type] || icons.info;
  return (
    <div className={`toast ${type}`} role={type === "error" ? "alert" : "status"}>
      <Icon size={20} aria-hidden="true" />
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Alert;
