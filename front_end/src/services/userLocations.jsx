import { LOCAL_SERVER_URL } from "../../config";

const UserLocations = async (methodType, target = null) => {
    if (methodType === "GET") {
      
      try {
        const response = await fetch(
          `http://${LOCAL_SERVER_URL}/userLocations`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (error) {
        console.error("Error fetching user locations:", error);
        throw error;
      }
    } else {
      try {
        const response = await fetch(
          `http://${LOCAL_SERVER_URL}/userLocations`,
          {
            method: methodType,
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              target,
            }),
          }
        );

        if (response.ok) {
          return { success: true, message: "Location added successfully" };
        } else {
          console.log(error);

          return {
            success: false,
            message: "Error adding location",
            error: error.message,
          };
        }
      } catch (error) {
        console.error("Error adding location:", error);
        console.log(error);

        return {
          success: false,
          message: "Error adding location",
          error: error.message,
        };
      }
    }
    console.log(error);

    return { success: false, message: "Invalid location data" };
  
};

export default UserLocations;
