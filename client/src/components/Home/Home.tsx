import React from 'react';
import './Home.scss';
import Nav from './Nav/Nav';
import TweetBox from './TweetBox/TweetBox';
import Latest from './Latest/Latest';
import { Route } from 'react-router-dom';
import Followed from './Followed/Followed';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='middle-container' id='sidebar-exit'>
        <Nav></Nav>
        <Route exact path='/home' component={TweetBox} />
        <Route exact path='/home' component={Latest} />
        <Route exact path='/followed' component={Followed} />
      </div>
    </div>
  );
};

export default Home;
