import animationData from "../../Context/animation-SignUp.json"
import Lottie from "lottie-react";

const  AnimateSignUp = () => {
  return <Lottie animationData={animationData} loop={true} className="w-96 " />;
};

export default AnimateSignUp ;
