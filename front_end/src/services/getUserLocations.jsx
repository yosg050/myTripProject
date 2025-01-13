import { LOCAL_SERVER_URL } from "../../config";

export const getUserLocations = async () => {
  try {
    const response = await fetch(
      `http://${LOCAL_SERVER_URL}/userLocations/getUserLocations`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {  
      const data = await response.json()
      return data; 
    }

  } catch (error) {
    console.error('Error fetching user locations:', error);
    throw error;
  }
};

