import ApiClient from "./ApiClient";

export const __CreateNotification = async (userId, threadId, data) => {
  try {
    const res = await ApiClient.post(`/notif/${userId}/${threadId}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DeleteNotification = async (id) => {
  try {
    const res = await ApiClient.delete(`/notif/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
