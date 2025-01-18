import { User } from "../../schemas.js";

const getUserDetails = async (userId) => {
    // console.log("userId_ getUserDetails:" ,  userId);
    
    if (!userId) {
        throw new Error("Missing userId");
    }
    try {
        const userDetails = await User.findOne({ _id  : userId });
        // console.log("userDetails", userDetails)
        if (!userDetails) {
            return null
        }
        const data = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            birthDate: userDetails.birthDate,
            gender: userDetails.gender,
            maritalStatus: userDetails.maritalStatus,
        }
        console.log("UserDetails: " , data);
        
        return data
           }
    catch (error) {
        console.error("Error fetching user data: ", error);
        return error
    }
}

export default getUserDetails  