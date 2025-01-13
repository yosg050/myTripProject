import { LOCAL_SERVER_URL } from "../../config";

const postUserSettings = async (newTarget, array) => {
  if (newTarget) {
    try {
      const response = await fetch(
        `http://${LOCAL_SERVER_URL}/userSettings/postUserSetting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            arrayName: array,
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
          // error: error.message,
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

export default postUserSettings;

