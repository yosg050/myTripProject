import { Locations } from "../../schemas.js";


const deleteUserLocation = async (userId, location) => {
    const locationDelete = location.target;
    try {
        const result = await Locations.updateOne({ userId }, { $pull: { items: { id: locationDelete.id } } });

        if (result.modifiedCount > 0) {
            return { success: true, message: "Location delete successfully" };
        }

    } catch (error) {
        console.error("Error delete location: ", error);
        return { success: false, message: "An error occurred while adding the location" };
    }
};

export default deleteUserLocation;