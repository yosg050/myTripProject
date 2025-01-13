import { LOCAL_SERVER_URL } from "../../config";

const getUserConnect = async (uid, email) => {
  try {
    const url = `http://${LOCAL_SERVER_URL}/login/user?uid=${uid}&email=${email}`;
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

    // if (response.ok) {
    //   const data = await response.json();
    //   if (data.token) {
    //     localStorage.setItem("authToken", data.token);
    //     // console.log("authToken", data.token);
    //   }

    //   return data;
    // }

    console.log("Failed to fetch user");
    return { error: "Failed to fetch user" };
  } catch (error) {
    console.error("Error fetching user", error);
    return { error: "Failed to fetch user" };
  }
};

export default getUserConnect;
