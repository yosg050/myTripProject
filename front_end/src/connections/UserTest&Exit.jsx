import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { BoxArrowLeft } from "react-bootstrap-icons";
import {  Dropdown } from "react-bootstrap";

const UserTestAndExit = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      Navigate("/SignIn");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/SignIn");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && (
        <Dropdown.Item as="button" onClick={handleSignOut}>
          <BoxArrowLeft className="me-2" /> יציאה
        </Dropdown.Item>
      )}
    </div>
  );
};

export default UserTestAndExit;
