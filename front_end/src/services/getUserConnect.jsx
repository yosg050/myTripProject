import { LOCAL_SERVER_URL } from "../../config";

const getUserConnect = async (uid, email, photoURL) => {
  try {
    const url = `http://${LOCAL_SERVER_URL}/login/user?uid=${uid}&email=${email}&photoUrl=${photoURL}`;
    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Failed to fetch user");
    return { error: "Failed to fetch user" };
  } catch (error) {
    console.error("Error fetching user", error);
    return { error: "Failed to fetch user" };
  }
};

export default getUserConnect;
