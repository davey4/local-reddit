import ApiClient from "./ApiClient";

export const __CreateUser = async (formData) => {
  try {
    const res = await ApiClient.post("/user/register", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __LoginUser = async (formData) => {
  try {
    const res = await ApiClient.post("/user/login", formData);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CheckSession = async () => {
  try {
    const res = await ApiClient.get("/user/refresh/session");
    return res.data;
  } catch (error) {
    throw error;
  }
};
