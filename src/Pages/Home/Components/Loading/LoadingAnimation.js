import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-transparent">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-borderPrimary h-44 w-44"></div>
    </div>
  );
};

export default LoadingAnimation;
