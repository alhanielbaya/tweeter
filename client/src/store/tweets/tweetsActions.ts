import { APPEND_TWEETS, SET_TWEETS, SET_PENDING } from './tweetsReducer';
import Axios from 'axios';

export function loadMore(
  dispatch: any,
  offset: number = 0,
  limit: number,
  type = 'latest'
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Axios.get(`tweets/${type}?offset=${offset}&limit=${limit}`).then(res => {
      const tweets = res.data.tweets;
      dispatch({ type: APPEND_TWEETS, payload: tweets });
      if (tweets.length === limit) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
export async function setTweets(
  dispatch: any,
  offset: number = 0,
  limit: number = 10,
  firstReload = false
) {
  if (firstReload) dispatch({ type: SET_PENDING, payload: true });
  Axios.get(`tweets/latest?offset=${offset}&limit=${limit}`).then(res => {
    const tweets = res.data.tweets;
    dispatch({ type: SET_TWEETS, payload: tweets });
  });
}

export async function getFollowedTweets(
  dispatch: any,
  offset: number = 0,
  limit: number = 10,
  firstReload = false
) {
  if (firstReload) dispatch({ type: SET_PENDING, payload: true });
  Axios.get(`tweets/followed?offset=${offset}&limit=${limit}`).then(res => {
    const tweets = res.data.tweets;
    dispatch({ type: SET_TWEETS, payload: tweets });
  });
}
