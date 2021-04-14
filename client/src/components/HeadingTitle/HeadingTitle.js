import React from 'react';

import './HeadingTitle.css';

const HeadingTitle = ({title, subtitle}) => {
    return(
        <div className="heading_container">
            <h2> {title} </h2>
            <p> {subtitle} </p>
        </div>
    );
}
export default HeadingTitle;