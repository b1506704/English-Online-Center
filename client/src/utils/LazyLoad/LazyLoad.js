import React from 'react';
import './LazyLoad.css';

const LazyLoad = () => {
  return (
    <div className="lazy_container" id="container">
      <div className="loader">
        <div className="bar1"/>
        <div className="bar2"/>
        <div className="bar3"/>
        <div className="bar4"/>
        <div className="bar5"/>
        <div className="bar6"/>
        <div className="bar7"/>
        <div className="bar8"/>
        <div className="bar9"/>
        <div className="bar10"/>
      </div>
      <div className="top_overlay" id="top_overlay" />
      <div className="loading_icon"> </div>
      <div className="bottom_overlay" id="bottom_overlay" />
    </div>
  );
}
export default LazyLoad
