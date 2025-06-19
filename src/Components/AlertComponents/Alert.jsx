import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  success: <CheckCircle className="text-green-600 w-6 h-6" />,
  error: <AlertCircle className="text-red-600 w-6 h-6" />,
  info: <Info className="text-blue-600 w-6 h-6" />,
};

const styleMap = {
  success: "bg-green-50 text-green-800",
  error: "bg-red-50 text-red-800",
  info: "bg-blue-50 text-blue-800",
};

const barColorMap = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const Alert = ({ type = "info", message, onClose, progress = 100 }) => {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-[90vw] max-w-md rounded-lg shadow-lg overflow-hidden ${styleMap[type]}`}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="pt-1">{iconMap[type]}</div>
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button onClick={onClose}>
          <X className="w-4 h-4 mt-1 text-gray-500 hover:text-gray-800" />
        </button>
      </div>
      <div className="w-full h-1 relative bg-gray-200">
        <div
          className={`${barColorMap[type]} h-full absolute top-0 left-0 transition-all duration-100`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default Alert;
