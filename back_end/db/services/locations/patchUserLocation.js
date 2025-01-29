import { Locations } from "../../schemas.js";


const patchUserLocation = async (userId, newLocation) => {
    if (!newLocation || !userId) {
        return { success: false, message: "Missing location or userId" };
    };
    const location = newLocation.target;
    try {
        console.log("newLocation", location);

        const ValueExistenceCheck = await Locations.updateOne({ userId, "items.id ": id },
            { $set: x }//not x
        );

        if (ValueExistenceCheck.acknowledged) {
            console.log("Location added successfully");

            return { success: true, message: "Location added successfully" };
        } else {
            console.log("Failed to add location");

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

export default patchUserLocation;