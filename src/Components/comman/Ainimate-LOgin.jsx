import animationData from "../../Context/animate-Login.json"
import Lottie from "lottie-react";

const  AnimateLogin = () => {
  return <Lottie animationData={animationData} loop={true} className="w-72" />;
};

export default AnimateLogin ;
