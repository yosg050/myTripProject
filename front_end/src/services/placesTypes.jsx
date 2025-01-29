import { LOCAL_SERVER_URL } from "../../config";

export const PlacesTypes = async (text) => {
  try {
    const response = await fetch(
      `http://${LOCAL_SERVER_URL}/placesTypes?value=${text}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

