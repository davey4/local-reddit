import ApiClient from "./ApiClient";

export const __CreateSub = async (userId, subId) => {
  try {
    const res = await ApiClient.post(`/subscription/${userId}/${subId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UnSub = async (userId, subId) => {
  try {
    const res = await ApiClient.delete(`/subscription/${userId}/${subId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetSubs = async (id) => {
  try {
    const res = await ApiClient.get(`/subscription/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
