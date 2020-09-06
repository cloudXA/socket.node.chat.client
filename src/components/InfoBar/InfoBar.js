import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/online.png'

import './InfoBar.scss';

const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img src={onlineIcon} alt="onlineIcon" className="onlineIcon"  />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close image " width="20px" height="20px" /></a>
    </div>
  </div>
)

export default InfoBar;