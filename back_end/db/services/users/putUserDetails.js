import { User } from "../../schemas.js";

const putUserDetails = async (userId, details) => {
    if (!details || !userId) {
        return { success: false, message: "Missing data or userId" };
    };
    console.log("details", userId, details);
    
    try {
        const result = await User.updateOne({ _id: userId },
            { $set: details, updatedDate: Date.now()}
        );
        
        if (result.modifiedCount > 0) {
            console.log("data updated successfully");
            return { success: true, message: "data updated successfully" };
        } else {
            console.log("Failed to updated  data");
            return { success: false, message: "Failed to updated  data" };
        }
    } catch (error) {
        console.error("Error updating data: ", error);
        console.log("Error adding data: ", error);
        return { success: false, message: "An error occurred while updating the data" };
    }
};


export default putUserDetails;