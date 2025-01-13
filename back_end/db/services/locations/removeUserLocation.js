import { Locations } from "../../schemas.js";


const removeUserLocation = async (userId, newLocation) => {
    if (!newLocation || !userId) {
        return { success: false, message: "Missing location or userId" };
    };

    try {
        const ValueExistenceCheck = await Locations.findOne({ userId, "items.id": newLocation.id });
        if (ValueExistenceCheck) {
            return { success: false, message: "Location already exists" };
        }
        const result = await Locations.updateOne({ userId }, { $push: { items: newLocation } });
        return { success: true, message: "Location added successfully" };
        return result
    } catch (error) {
        console.error("Error adding location: ", error);
        return { success: false, message: "An error occurred while adding the location" };
    }
};

export default removeUserLocation;