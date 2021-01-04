import ApiClient from "./ApiClient";

export const __CreateComment = (id, data) => {
  try {
      const res = await ApiClient.post(`/comment/${id}`, data)
      return res.data
  } catch (error) {
    throw error;
  }
};

export const __UpdateComment = (id, data) => {
  try {
      const res = await ApiClient.put(`/comment/${id}`, data)
      return res.data
  } catch (error) {
    throw error;
  }
};

export const __DeleteComment = (id) => {
  try {
      const res = await ApiClient.delete(`/comment/${id}`)
      return res.data
  } catch (error) {
    throw error;
  }
};

export const __UpVoteComment = (id) => {
  try {
      const res = await ApiClient.put(`/comment/like/${id}`)
      return res.data
  } catch (error) {
    throw error;
  }
};

export const __DownVoteComment = (id) => {
  try {
      const res = await ApiClient.put(`/comment/unlike/${id}`)
      return res.data
  } catch (error) {
    throw error;
  }
};
