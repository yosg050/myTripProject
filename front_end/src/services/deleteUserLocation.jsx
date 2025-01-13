import { LOCAL_SERVER_URL } from "../../config";

const addLocationToUser = async (newTarget) => {
  
  if (newTarget) {
    try {
      const response = await fetch(
        `http://${LOCAL_SERVER_URL}/userLocations/postUserLocation`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: newTarget.place_id,
            name: newTarget.name,
            address: newTarget.address,
            latitude: newTarget.latitude,
            longitude: newTarget.longitude,
            tripTypes: newTarget.tripTypes,
            notes: newTarget.notes,
            // addedAt: newTarget.addedAt,
          }),
        }
      );
      if (response.ok) {
        return { success: true, message: "Location added successfully" };
    } else {
        const errorData = await response.json();
        return {
            success: false,
            message: "Error adding location",
            error: errorData.error || "Unknown error"
        };
    }
    } catch (error) {
      console.error("Error adding location:", error);
      return {
        success: false,
        message: "Error adding location",
        error: error.message,
      };
    }
  }
  return { success: false, message: "Invalid location data" };
};

export default addLocationToUser;
