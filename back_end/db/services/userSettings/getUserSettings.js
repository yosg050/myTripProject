import { UsersSettings } from "../../schemas.js";

const getUserSettings = async (userId) => {

    if (!userId) {
        throw new Error("Missing userId");
    }
    try {
        const usersSettings = await UsersSettings.findOne({ userId });
        console.log("usersSettings", usersSettings)
        if (!usersSettings) {
            return null
        }
        const data = {
            selectedPlaces: usersSettings.selectedPlaces,
            typesOfTrips: usersSettings.typesOfTrips,
            children: usersSettings.children
        }
        return data
           }
    catch (error) {
        console.error("Error fetching user data: ", error);
        return error
    }
}

export default getUserSettings  