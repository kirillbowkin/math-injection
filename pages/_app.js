import "../styles/globals.css";
import "../configureAmplify";
import NavBar from "../components/NavBar";
import { UserProvider } from "../providers/UserProvider";
// Fixed issues with env vars, this time it must work

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <NavBar />
        <div className="py-6 px-6">
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </>
  );
}

export default MyApp;
