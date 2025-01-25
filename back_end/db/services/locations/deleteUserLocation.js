import { Locations } from "../../schemas.js";


const deleteUserLocation = async (userId, location) => {
    if (!location || !userId) {
        return { success: false, message: "Missing location or userId" };
    };

    try {
        // const ValueExistenceCheck = await Locations.findOne({ userId, "items.id": location.id });
        // if (ValueExistenceCheck) {
        //     return { success: false, message: "Location already exists" };
        // }
        const result = await Locations.updateOne({ userId }, { $pull: { items: location.id } });
        if (result.acknowledged) {
            return { success: true, message: "Location delete successfully" };
        }

    } catch (error) {
        console.error("Error delete location: ", error);
        return { success: false, message: "An error occurred while adding the location" };
    }
};

export default deleteUserLocation;