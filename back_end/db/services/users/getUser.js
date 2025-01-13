import { User } from "../../schemas.js";

const getUser = async (uid) => {

    try {
        let user = await User.findOne({ _uid: uid })
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

export default getUser;


