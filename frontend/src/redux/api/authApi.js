import { setCredentials } from "../slices/authSlice";

const API_URL = import.meta.env.VITE_API_URL;


export const login = (credentials) => async (dispatch) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  console.log("Login response data:", data);

  if (data.success) {
    dispatch(
      setCredentials({
        user: { name: data.name, email: data.email },
        token: data.jwtToken,
      })
    );
    return data;
  } else {
    throw new Error(data.message || "Login failed");
  }
};

export const signup = (userInfo) => async (dispatch) => {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();

  if (data.success) {
    return data;
  } else {
    throw new Error(data.message || "Signup failed");
  }
};
