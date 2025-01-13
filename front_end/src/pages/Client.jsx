import { Outlet } from "react-router-dom";
import { UserProfileProvider } from "../connections/GetUserDate";
import { useAuth } from "../connections/AuthContext";
import UserProfile from "../connections/UserProfile";
// import AuthProviderToken from "../connections/AuthProviderToken";

const Client = () => {
  const { user } = useAuth();
  const userId = user.uid;

  console.log(user);

  return (
    <div>
      <UserProfileProvider userId={userId}>
        {/* <AuthProviderToken> */}
          <UserProfile>
            <Outlet />
          </UserProfile>
        {/* </AuthProviderToken> */}
      </UserProfileProvider>
    </div>
  );
};

export default Client;
