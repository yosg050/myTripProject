import { LOCAL_SERVER_URL } from "../../config";

const postUserSettings = async (newTarget, array, methodType) => {
  if (newTarget) {
    try {
      const response = await fetch(
        `http://${LOCAL_SERVER_URL}/userSettings/UserSetting`,
        {
          method: methodType,
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

// import { LOCAL_SERVER_URL } from "../../config";

// export const getUserSettings = async () => {
//   try {
//     const response = await fetch(
//       `http://${LOCAL_SERVER_URL}/userSettings/UserSettings`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       }
//     );


//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     return data; 
//   } catch (error) {
//     console.error('Error fetching user locations:', error);
//     throw error;
//   }
// };

