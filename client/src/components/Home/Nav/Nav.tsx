import React, { useState } from 'react';
import './Nav.scss';
import SideBar from './SideBar/SideBar';
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const [yOffSet, setY] = useState(window.pageYOffset);
  const location = useLocation();

  const [currentPageName, setCurrentPageName] = useState('Home');

  function handleClick(e: any) {
    const sidebar: any = document.getElementById('mobile-sidebar');
    const sidebarBg: any = document.getElementById('sidebar-bg');

    sidebar.style.width = '320px';
    sidebarBg.style.width = '100%';
    sidebarBg.style.height = '100%';
  }

  function responsiveNavBar() {
    setY(window.pageYOffset);
  }

  React.useEffect(() => {
    window.addEventListener('scroll', responsiveNavBar);
    switch (location.pathname) {
      case '/home':
        setCurrentPageName('Home');
        break;
      case '/followed':
        setCurrentPageName('Followed Tweets');
        break;
      default:
        break;
    }

    return () => {
      window.removeEventListener('scroll', responsiveNavBar);
    };
  });

  return (
    <>
      <SideBar></SideBar>

      <div className='nav-container'>
        <svg
          className={yOffSet > 70 ? 'activated-nav' : ''}
          // version='1.1'
          id='mobile-menu'
          x='0px'
          y='0px'
          width='124px'
          height='124px'
          viewBox='0 0 124 124'
          onClick={handleClick}
        >
          <g>
            <path d='M112,6H12C5.4,6,0,11.4,0,18s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,6,112,6z' />
            <path d='M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z' />
            <path d='M112,94H12c-6.6,0-12,5.4-12,12s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,94,112,94z' />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>

        <h1>{currentPageName}</h1>
      </div>
    </>
  );
};

export default Nav;
