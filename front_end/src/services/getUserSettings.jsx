import { LOCAL_SERVER_URL } from "../../config";

export const getUserSettings = async () => {
  try {
    const response = await fetch(
      `http://${LOCAL_SERVER_URL}/userSettings/getUserSettings`,
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
    console.error('Error fetching user locations:', error);
    throw error;
  }
};

