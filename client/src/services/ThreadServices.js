import ApiClient from "./ApiClient";

export const __CreateThread = async (id, data) => {
  try {
    const res = await ApiClient.post(`/thread/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpdateThread = async (id, data) => {
  try {
    const res = await ApiClient.put(`/thread/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DeleteThread = async (id) => {
  try {
    const res = await ApiClient.delete(`/thread/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetAllThreads = async (id) => {
  try {
    const res = await ApiClient.get(`/thread/all/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetThread = async (id) => {
  try {
    const res = await ApiClient.get(`/thread/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpVoteThread = async (id) => {
  try {
    const res = await ApiClient.put(`/thread/like/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DownVoteThread = async (id) => {
  try {
    const res = await ApiClient.put(`/thread/unlike/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
