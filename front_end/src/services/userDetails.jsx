import { LOCAL_SERVER_URL } from "../../config";

const UserDetails = async (methodType, details = null) => {
  if (details) {
    console.log(details);
    try {
      const response =
        methodType === "GET"
          ? await fetch(`http://${LOCAL_SERVER_URL}/user/details`, {
              method: methodType,
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            })
          : await fetch(`http://${LOCAL_SERVER_URL}/user/details`, {
              method: methodType,
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                value: details,
              }),
            });

      if (response.ok) {
        if (methodType === "GET") {
          const data = await response.json();
          return { success: true, data };
        }
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
};

export default UserDetails;
