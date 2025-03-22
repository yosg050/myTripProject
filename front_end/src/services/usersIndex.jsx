import { LOCAL_SERVER_URL } from "../../config";

const UsersIndex = async (Value) => {
  try {
    const url = `http://${LOCAL_SERVER_URL}/login/user?Value=${Value}`;
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

    console.log("Failed to fetch users");
    return { error: "Failed to fetch users" };
  } catch (error) {
    console.error("Error fetching users", error);
    return { error: "Failed to fetch users" };
  }
};

export default UsersIndex;