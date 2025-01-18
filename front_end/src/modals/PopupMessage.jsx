import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

function PopupMessage({ variant, message }) {
  
  const [show, setShow] = useState(false);
  const duration = 1000;

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message]);
  if (!show) return null;

  return (
    <>
      <Alert
        style={{
          
          top: "10px",
          zIndex: 1050,
        }}
        variant={variant}
        onClose={() => setShow(false)}
        dismissible
      >
        {message}
      </Alert>
    </>
  );
}

export default PopupMessage;
