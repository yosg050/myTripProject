import { LOCAL_SERVER_URL } from "../../config";

const UserDetails = async (methodType, details = null) => {
  if (methodType === "GET") {
    try {
      const response = await fetch(`http://${LOCAL_SERVER_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  } else {
    if (details) {
      console.log(details);
      try {
        const response = await fetch(
          `http://${LOCAL_SERVER_URL}/user`,
          {
            method: methodType,
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              value: details,
            }),
          }
        );

        if (response.ok) {
          return { success: true, message: "Settings added successfully" };
        } else {
          return {
            success: false,
            message: "Error adding data",
          };
        }
      } catch (error) {
        console.error("Error adding data:", error);
        return {
          success: false,
          message: "Error adding settings",
          error: error.message,
        };
      }
    }
    return { success: false, message: "Invalid settings data" };
  }
};

export default UserDetails;
