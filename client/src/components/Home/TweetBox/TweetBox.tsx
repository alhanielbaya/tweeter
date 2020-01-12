import React from 'react';
import './TweetBox.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../..';
import Axios from 'axios';
import { setTweets } from '../../../store/tweets/tweetsActions';
import { usePageState } from '../../../custom-hooks/custom-hooks';

const TweetBox = () => {
  const dispatch = useDispatch();
  const { setHasMore, setOffset, limit } = usePageState();

  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const isPending = useSelector((state: IRootState) => state.tweets.pending);
  const profile = useSelector((state: IRootState) => state.user.profile);

  const imageUrl = useSelector(
    (state: IRootState) => state.user.profile.imageUrl
  );

  const [tweet, setTweet] = React.useState('');

  function handleTweetChange(e: any) {
    setTweet(e.target.value);
  }

  function submitTweet() {
    if (tweet === '') return;
    if (!/[A-Za-z0-9]/.test(tweet)) {
      return;
    }
    const ta: any = document.getElementById('tweet-area');
    const data = { profile: profile, post: tweet };
    Axios.post('tweets/post', data).then(() => {
      ta.value = '';
      setHasMore(true);
      setOffset(0);
      setTweets(dispatch, 0, limit);
    });
  }

  function handleKeys(e: any) {
    if (e.keyCode === 13) {
      submitTweet();
    }
  }

  return (
    <div className='tweet-box-container'>
      {!isAuth && !isPending ? (
        <div className='toast toast-primary follow-toast' id='follow-toast'>
          <button
            className='btn btn-clear float-right'
            onClick={() => {
              const toast: any = document.getElementById('follow-toast');
              toast.style.display = 'none';
            }}
          ></button>
          You can login to follow users.
        </div>
      ) : (
        ''
      )}
      <div className='tweeting'>
        <ProfileImage imageUrl={imageUrl}></ProfileImage>
        <div className='form-group tweet-area'>
          <textarea
            className='form-input'
            id='tweet-area'
            placeholder={isAuth ? 'Say Something...' : 'Login to tweet...'}
            disabled={!isAuth}
            rows={3}
            onChange={handleTweetChange}
            onKeyDown={e => handleKeys(e)}
            value={tweet}
            maxLength={140}
            wrap='virtual'
          ></textarea>
        </div>
      </div>

      {isAuth ? (
        <button className='btn tweet-button' onClick={submitTweet}>
          Tweet
        </button>
      ) : (
        <a className='btn btn-primary tweet-button' href='/login'>
          Login to tweet
        </a>
      )}
    </div>
  );
};

export default TweetBox;
