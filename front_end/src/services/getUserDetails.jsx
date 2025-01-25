// import { LOCAL_SERVER_URL } from "../../config";

// export const getUserDetails = async () => {
//   try {
//     const response = await fetch(
//       `http://${LOCAL_SERVER_URL}/user/details`,
//       {
//         method: "GET",
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
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// };

