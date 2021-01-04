import ApiClient from "./ApiClient";

export const __CreateSub = async (id, data) => {
  try {
    const res = await ApiClient.post(`/sub/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpdateSub = async (id, data) => {
  try {
    const res = await ApiClient.put(`/sub/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DeleteSub = async (id) => {
  try {
    const res = await ApiClient.delete(`/sub/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetAllSubs = async () => {
  try {
    const res = await ApiClient.get("/sub/");
    return res.data;
  } catch (error) {
    throw error;
  }
};
