import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const firestore = getFirestore();

const searchUsers = async (searchValue) => {
  if (!searchValue.trim()) {
    return { users: [], lastDocumentId: null };
  }

  const usersCollection = collection(firestore, "Users");

  const q = query(
    usersCollection,
    where("keywords", "array-contains", searchValue.toLowerCase())
  );

  try {
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      email: doc.data().email,

      //   ...doc.data(),
    }));
    console.log(users);

    return users;
  } catch (error) {
    console.error("Error searching users", error);

    return [];
  }
};
export default searchUsers;



