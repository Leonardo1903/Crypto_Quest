import { useContext, useState, useEffect, createContext } from "react";
import ReactLoading from 'react-loading';
import { account } from "../appwriteConfig";
import {createBrowserHistory} from "history";



export const ErrorContext = createContext();
const AuthContext = createContext();
const history =  createBrowserHistory();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState(false);

  
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    try {
      setLoading(true);

      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      console.log("accountDetails: ", accountDetails);
      setuser(accountDetails);
      //   console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error.message);  // alert the user
      setErrorMessage(error.message);
      history.push("/login"); // redirect to login page
      setLoading(false)
    }
  };

  const logoutUser = () => {
    account.deleteSession("current");
    setuser(null);
  };

  const registerUser = () => {};

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setuser(accountDetails);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <ErrorContext.Provider value = {errorMessage}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <ReactLoading type={"spin"} color={"#FFD700"} height={'10%'} width={'10%'} />
        </div>
        ) : (
          children
        )}
      </ErrorContext.Provider>

    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useError = () =>{
  return useContext(ErrorContext);
}

export default AuthContext;
