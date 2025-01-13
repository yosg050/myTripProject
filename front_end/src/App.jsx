import React, { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Client from "./pages/Client";
import SignIn from "./connections/Authentication";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { AuthProvider } from "./connections/AuthContext";
import { Spinner } from "react-bootstrap";
import ProtectedRoute from "./connections/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./pages/ErrorBoundary";
import AuthProviderToken from "./connections/AuthProviderToken";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <ErrorBoundary>
          <ProtectedRoute>
          <AuthProviderToken>
            <Client />
       </AuthProviderToken>
          </ProtectedRoute>
        </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Home/>,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState(null);
  const [site, setSite] = useState(
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Spinner variant="primary" />
    </div>
  );
  useEffect(() => {
    onAuthStateChanged(auth, (a) => {
      setUser(a);
      setSite(<RouterProvider router={router} />);
      // if (a != null)
      console.log(a);
    });
  }, [user]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <AuthProvider>{site}</AuthProvider>
    </div>
  );
}

export default App;
