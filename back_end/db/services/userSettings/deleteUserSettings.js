import { UsersSettings } from "../../schemas.js";


const deleteUserSittings = async (userId, newData) => {
    if (!newData || !userId) {
        return { success: false, message: "Missing data or userId" };
    };
    const { arrayName, value } = newData;
    console.log("newData", newData);
    try {
        const result = await UsersSettings.updateOne({ userId },
            { $pull: { [arrayName]: value } }
        );
        
        if (result.nModified > 0) {
            console.log("data added successfully");
            return { success: true, message: "data added successfully" };
        } else {
            console.log("Failed to add data");
            return { success: false, message: "Failed to add data" };
        }
    } catch (error) {
        console.error("Error adding data: ", error);
        console.log("Error adding data: ", error);
        return { success: false, message: "An error occurred while adding the data" };
    }
};

export default deleteUserSittings;
