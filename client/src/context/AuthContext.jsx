import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, username: action.payload.user.username };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const validateToken = async () => {
      const res = await fetch(`/api/verifytoken`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    };

    if (user) {
      validateToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
