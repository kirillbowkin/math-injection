import { useState, useEffect } from "react";
import { useUser } from "../providers/UserProvider";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import SignedIn from "../components/authentication/SignedIn";
import ConfirmSignUp from "../components/authentication/ConfirmSignUp";
import { Auth } from "aws-amplify";

function Profile() {
  const [uiState, setUiState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    authCode: "",
  });
  const { email, password, authCode } = formState;
  const { user } = useUser();
  const { login, logout } = useUser();

  useEffect(() => {
    if (user) {
      setUiState("signedIn");
    } else {
      setUiState("signIn");
    }
  }, []);

  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function signUp() {
    try {
      await Auth.signUp({ username: email, password, attributes: { email } });
      setUiState("confirmSignUp");
    } catch (err) {
      console.log({ err });
    }
  }
  async function confirmSignUp() {
    try {
      await await Auth.confirmSignUp(email, authCode);
      await login(email, password);
      setUiState("signedIn");
    } catch (err) {
      console.log({ err });
    }
  }
  async function signIn() {
    try {
      await login(email, password);
      setUiState("signedIn");
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center">
        <div className="max-w-full sm:w-540 mt-14">
          <div className="bg-white py-14 px-16 shadow-form rounded">
            {uiState === "signedIn" && (
              <SignedIn setUiState={setUiState} onChange={onChange} />
            )}
            {uiState === "signUp" && (
              <SignUp
                setUiState={setUiState}
                onChange={onChange}
                signUp={signUp}
              />
            )}
            {uiState === "confirmSignUp" && (
              <ConfirmSignUp
                setUiState={setUiState}
                onChange={onChange}
                confirmSignUp={confirmSignUp}
              />
            )}
            {uiState === "signIn" && (
              <SignIn
                setUiState={setUiState}
                onChange={onChange}
                signIn={signIn}
              />
            )}
            {uiState === "forgotPassword" && (
              <ForgotPassword
                setUiState={setUiState}
                onChange={onChange}
                forgotPassword={forgotPassword}
              />
            )}
            {uiState === "forgotPasswordSubmit" && (
              <ForgotPasswordSubmit
                setUiState={setUiState}
                onChange={onChange}
                forgotPasswordSubmit={forgotPasswordSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
