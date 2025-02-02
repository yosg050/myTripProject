
import { Locations, User, UsersSettings } from "../../schemas.js";



const newUserCreate = async (userUid, email, photoUrl) => {
    console.log(userUid, email);

    try {
        const user = await User.create({
            _uid: userUid,
            email: email,
            publicId: userUid,
        });

        await Promise.all([
            Locations.create({
                userId: user._id.toString(),
            }),
            UsersSettings.create({
                userId: user._id.toString(),
            })
        ]);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");

    }

}

export default newUserCreate