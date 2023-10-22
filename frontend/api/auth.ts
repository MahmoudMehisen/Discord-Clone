import axios from "../lib/axios";

export const loginRequest = async (email: string, password: string) =>
  axios.post("/auth/login", {
    email,
    password,
  });

export const registerRequest = async (
  email: string,
  password: string,
  username: string
) =>
  axios.post("/auth/register", {
    email,
    password,
    username,
  });
