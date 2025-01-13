import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserLocations } from "../services/getUserLocations";
import { getUserSettings } from "../services/getUserSettings";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProfile = ({ children }) => {
  const [userLocations, setUserLocations] = useState(null);
  const [userSettings, setUserSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDataWiteToken = async () => {

    
    const token = localStorage.getItem("authToken");

    if (!token) {
      
      setLoading(false);
      return;
    }
    try {
      const userLocations = await getUserLocations();
      console.log(userLocations.locations);

      setUserLocations(userLocations.locations);

      const userSettings = await getUserSettings();
      console.log(userSettings);
      setUserSettings(userSettings);

      setError(null);
    } catch (error) {
      setError('Failed to fetch user data"');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDataWiteToken();
  }, []);

  const refreshUserData = () => {
    setLoading(true);
    fetchUserDataWiteToken();
  };
  return (
    <UserContext.Provider
      value={{
        userLocations,
        userSettings,
        loading,
        error,
        setUserLocations,
        setUserSettings,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProfile;
