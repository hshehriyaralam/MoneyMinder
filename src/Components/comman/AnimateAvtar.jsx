import animationData from "../../Context/lordicon-animation.json"
import Lottie from "lottie-react";

const AnimatedAvatar = () => {
  return <Lottie animationData={animationData} loop={true} className="w-96 " />;
};

export default AnimatedAvatar;
