import React, { createContext, useContext, useEffect, useState } from "react";
import UserSettings from "../services/userSettings";
import UserLocations from "../services/userLocations";
import UserDetails from "../services/userDetails";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProfile = ({ children }) => {
  const [userLocations, setUserLocations] = useState(null);

  const [userSettings, setUserSettings] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userSettingsTripTypes, setUserSettingsTripTypes] = useState(null);
  const [userSettingsChildren, setUserSettingsChildren] = useState(null);
  const [userSettingsSelectedPlaces, setUserSettingsSelectedPlaces] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDataWiteToken = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const userLocations = await UserLocations("GET");
      console.log(userLocations.locations);
      setUserLocations(userLocations.locations);

      const userDetails = await UserDetails("GET");
      console.log(userDetails);
      setUserDetails(userDetails);

      const userSettings = await UserSettings("GET");
      setUserSettings(userSettings);

      if (userSettings?.userSettings) {
        setUserSettingsTripTypes(userSettings.userSettings.typesOfTrips);
        setUserSettingsChildren(userSettings.userSettings.selectedPlaces);
        setUserSettingsSelectedPlaces(userSettings.userSettings.children);
      }

      console.log(userSettings);
      console.log(userSettingsTripTypes);
      console.log(userSettingsChildren);
      console.log(userSettingsSelectedPlaces);

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
        userDetails,
        userLocations,
        userSettings,
        userSettingsTripTypes,
        userSettingsChildren,
        userSettingsSelectedPlaces,
        loading,
        error,
        setUserDetails,
        setUserLocations,
        setUserSettings,
        setUserSettingsTripTypes,
        setUserSettingsChildren,
        setUserSettingsSelectedPlaces,

        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProfile;
