import { LOCAL_SERVER_URL } from "../../config";

const UserImage = async (methodType, newTarget = null) => {
  
  if (methodType === "GET") {
    try {
      const response = await fetch(
        `http://${LOCAL_SERVER_URL}/UserImage`,
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
      console.error("Error fetching user data:", error);
      throw error;
    }
  } else {
    console.log("newTarget", newTarget);
    
    if (newTarget) {
      try {
        const response = await fetch(
          `http://${LOCAL_SERVER_URL}/UserImage`,
          {
            method: methodType,
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              value: newTarget,
            }),
          }
        );

        if (response.ok) {
          return { success: true, message: "Settings added successfully" };
        } else {
          return {
            success: false,
            message: "Error adding settings",
          };
        }
      } catch (error) {
        console.error("Error adding settings:", error);
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


export default UserImage;
