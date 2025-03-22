import { User } from "../../schemas.js";

const usersIndex = async (value) => {

    try {
        let users = await User.find({ firstName: value })
        console.log("user: ", user);
        if (user) {
            return user
        } else {
            return null
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error
    }
}

export default usersIndex;


