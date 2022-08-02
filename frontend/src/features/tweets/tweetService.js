import axios from 'axios';

const API_URL = '/api/tweets/';

const likeTweet = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${id}/LikeTweet`, {}, config);

  return response.data;
};

const getTweets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const createTweet = async (tweetBody, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, tweetBody, config);

  return response.data;
};

const deleteTweet = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${id}`, config);

  return response.data;
};

const tweetService = {
  getTweets,
  createTweet,
  deleteTweet,
  likeTweet,
};

export default tweetService;
