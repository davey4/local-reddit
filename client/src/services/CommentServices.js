import ApiClient from "./ApiClient";

export const __CreateComment = async (id, data) => {
  try {
    const res = await ApiClient.post(`/comment/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpdateComment = async (id, data) => {
  try {
    const res = await ApiClient.put(`/comment/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DeleteComment = async (id) => {
  try {
    const res = await ApiClient.delete(`/comment/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpVoteComment = async (id) => {
  try {
    const res = await ApiClient.put(`/comment/like/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DownVoteComment = async (id) => {
  try {
    const res = await ApiClient.put(`/comment/unlike/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CommentOnComment = async (userId, parentId, data) => {
  try {
    const res = await ApiClient.post(
      `/comment/sub/${userId}/${parentId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetMoreComments = async (commentId) => {
  try {
    const res = await ApiClient.get(`/comment/${commentId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
