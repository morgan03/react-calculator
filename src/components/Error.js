import React, { useEffect } from "react";

const Error = ({ errorMessage, closeError }) => {
  useEffect(() => {
    setTimeout(() => {
      closeError();
    }, 3000);
  });
  return (
    <div className="error">
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error;
