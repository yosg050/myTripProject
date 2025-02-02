import { Locations } from "../../schemas.js";


const getUserLocations = async (userId) => {

    try {
        const userLocations = await Locations.findOne({ userId });
        console.log("userLocations", userLocations)
        if (!userLocations) {
            return null
        }
        return {
            locations: userLocations.items,
        };
    }
    catch (error) {
        console.error("Error fetching user data: ", error);
        return error
    }
}

export default getUserLocations  