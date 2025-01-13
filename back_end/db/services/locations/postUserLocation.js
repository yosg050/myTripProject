import { Locations } from "../../schemas.js";


const postUserLocation = async (userId, newLocation) => {
    if (!newLocation || !userId) {
        return { success: false, message: "Missing location or userId" };
    };

    try {
        console.log("newLocation", newLocation);

        const ValueExistenceCheck = await Locations.updateOne({ userId },
            { $push: { items: newLocation } }
        );
        console.log("ValueExistenceCheck", ValueExistenceCheck);

        if (ValueExistenceCheck.nModified > 0) {

            return { success: true, message: "Location added successfully" };
        } else {
            return { success: false, message: "Failed to add location" };
        }
    } catch (error) {
        if (error.code === 11000) { 
            return { success: false, message: "Location already exists" };
        }
        console.error("Error adding location: ", error);
        return { success: false, message: "An error occurred while adding the location" };
    }
};

export default postUserLocation;