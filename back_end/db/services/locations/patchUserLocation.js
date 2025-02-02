import { Locations } from "../../schemas.js";


const patchUserLocation = async (userId, location) => {

    const { locationID, updatedFields } = location.target;
    // const locationID = location.target.locationID;
    // const updatedFields = location.target.updatedFields;
    try {
        const updatedObject = {};
        Object.entries(updatedFields).forEach(([key, value]) => {
            updatedObject[`items.$.${key}`] = value;
        });

        const ValueExistenceCheck = await Locations.updateOne(
            { userId,
            "items.id": locationID },
            { $set: updatedObject }
        );
        console.log("ValueExistenceCheck", ValueExistenceCheck);
        
        if (ValueExistenceCheck.modifiedCount > 0 ) { // acknowledged
            console.log("Location added successfully");

            return { success: true, message: "Location updated  successfully" };
        } else {
            console.log("Failed to add location");
            return { success: false, message: "Location not found or no changes made" };
        }
    } catch (error) {
        console.error("Error adding location: ", error);
        return { success: false, message: "An error occurred while adding the location" };
    }
};

export default patchUserLocation;