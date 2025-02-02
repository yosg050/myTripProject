import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import logoImage from "../assets/logo3.png";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { Google } from "react-bootstrap-icons";
import getUserConnect from "../services/getUserConnect";

const SignIn = () => {
  // const [error, setError] = useState(null);
  // const { user } = auth;

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const uid = result.user.uid;
      const email = result.user.email;
      const photoUrl = result.user.photoURL;
      const userData = getUserConnect(uid, email, photoUrl);

      if (userData.error) {
        console.log("Failed to fetch user");
        return;
      }
      console.log("userData", userData);

      const idToken = await result.user.getIdToken();
      localStorage.setItem("authToken", idToken);

      console.log("idToken", idToken);

      navigate("/");
      console.log("Google sign-in successful");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          border: "1px solid #007bff",
          borderRadius: "20px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          padding: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={logoImage}
          rounded
          style={{ width: "225px", height: "90px" }}
        />

        <Button
          variant="outline-info"
          type="button"
          onClick={handleGoogleSignIn}
          style={{
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",

            marginTop: "40px",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Google התחברות באמצעות <Google />
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
