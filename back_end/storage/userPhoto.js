import { User } from "../db/schemas.js";
// import putUserDetails from "../db/services/users/putUserDetails";
import uploadFile from "./uploadFile.js";

const userPhoto = async (photoUrlNew, id) => {
    try {
        const result = await User.findOne({ _id: id }, { projection: { photoUrl: photoUrlNew } });

        if ((result && result.photoUrl)  ||(result !== photoUrlNew)){
            uploadFile(photoUrlNew, id, id)

        }
    }
    catch (error) {
        console.error("Error fetching user", error);
        return { error: "Failed to fetch user" };
    }

}

export default userPhoto;