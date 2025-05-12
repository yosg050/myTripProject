// import { signOut } from "firebase/auth";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebaseConfig";

// const AuthProviderToken = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("authToken");//authToken

//   useEffect(() => {
//     const checkToken = () => {
//       if (!token) {
//         signOut(auth);
//         navigate("/SignIn");
//         return;
//       }

//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const expirationTime = payload.exp * 1000;
//       const currentTime = Date.now();

//       if (currentTime >= expirationTime) {
//         signOut(auth).then(() => {
//           localStorage.removeItem("authToken");
//           navigate("/SignIn");
//         });
//       }
//     };

//     checkToken();
//     const interval = setInterval(checkToken, 5 * 60 * 1000);

//     return () => clearInterval(interval);
//   }, [navigate, token]);

//   return <>{children}</>;
// };

// export default AuthProviderToken;

import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const AuthProviderToken = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");  // JWT שלך

  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        signOut(auth);
        navigate("/SignIn");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          signOut(auth).then(() => {
            localStorage.removeItem("authToken");
            navigate("/SignIn");
          });
        }
      } catch (error) {
        console.error("Token error:", error);
        signOut(auth);
        localStorage.removeItem("authToken");
        navigate("/SignIn");
      }
    };

    checkToken(); 
    const interval = setInterval(checkToken, 5 * 60 * 1000);  

    return () => clearInterval(interval); 
  }, [navigate, token]);

  return <>{children}</>;
};

export default AuthProviderToken;
