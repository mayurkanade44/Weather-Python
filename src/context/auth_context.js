import { createContext, useContext, useReducer} from "react";
import reducer from "./auth_reducer";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  token: '',
  loading: true,
  isAuthenticated: false,
  error: null,
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (name, email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/data/register/",
        { name: name, email: email, password: password },
        config
      );
      console.log("yes");
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  const login = async(username, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try { const res = await axios.post(
      "http://127.0.0.1:8000/data/login/",
      { username: username, password: password },
      config
    );
    console.log("yes");
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
      
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response.data.detail
      })
      
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
