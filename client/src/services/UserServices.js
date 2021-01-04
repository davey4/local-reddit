import ApiClient from "./ApiClient";

export const __CreateUser = async (formData) => {
  try {
    const res = await ApiClient.post("/users/register", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __LoginUser = async (formData) => {
  try {
    const res = await ApiClient.post("/users/login", formData);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CheckSession = async () => {
  try {
    const res = await ApiClient.get("/users/refresh/session");
    return res.data;
  } catch (error) {
    throw error;
  }
};
