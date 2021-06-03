import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useUser } from "../../providers/UserProvider";

function SignedIn({ setUiState }) {
  const [userProfile, setUserProfile] = useState(null);
  const { user, logout } = useUser();

  useEffect(() => {
    checkUser();
  }, []);
  async function checkUser() {
    setUserProfile(user);
  }
  if (!userProfile) return null;
  return (
    <>
      <p className="text-xl font-black">Welcome, {user.attributes.email}</p>
      <button
        onClick={() => {
          logout();
          setUiState("signIn");
        }}
        className="text-white w-full mt-10 bg-blue-600 p-3 rounded"
      >
        Sign Out
      </button>
    </>
  );
}

export default SignedIn;
