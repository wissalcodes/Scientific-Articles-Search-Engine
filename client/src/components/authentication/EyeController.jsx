import { useState } from "react";
import closedEye from "../../../public/images/authentication/eye-off.svg";
import openEye from "../../../public/images/authentication/eye.svg";

export const EyeController = ({ onVisibilityChange }) => {
  // password initially invisible
  const [isVisible, setIsVisible] = useState(false);
  //
  const toggleVisibility = () => {
    // handle local state
    setIsVisible(!isVisible);
    // notify parent state about the visibility change
    onVisibilityChange(!isVisible);
  };

  return (
    <div onClick={toggleVisibility} style={{ cursor: "pointer" }}>
      {/* if the eye asset is clicked, load the opposite state asset */}
      <img width="20px" src={isVisible ? closedEye : openEye} />
    </div>
  );
};
