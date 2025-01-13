
import admin from 'firebase-admin';

const firebaseAuth = async (uidClient) => {

    console.log(uidClient);

    try {
        const userRecord = await admin.auth().getUser(uidClient);
        if (userRecord) {
            console.log("Successfully fetched user data:", userRecord.toJSON());
            return true;
        } else {
            console.error("Failed to fetch user data");
            return false;
        }
        
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        return false;
    }
}
export default firebaseAuth;


  