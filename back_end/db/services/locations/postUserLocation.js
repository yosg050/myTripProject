import { Locations } from "../../schemas.js";


const postUserLocation = async (userId, newLocation) => {
    const location = newLocation.target;
    try {
        console.log("newLocation", location);

        const ValueExistenceCheck = await Locations.updateOne({ userId },
            { $push: { items: location } }
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

export default postUserLocation;