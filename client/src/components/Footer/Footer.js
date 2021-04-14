import React from 'react';

import './Footer.css';

const Footer = () => {
    const date = new Date();
    return(
        <footer>
            <div className="content-wrapper">
                <h1>&copy; { date.getFullYear() }, Real Estate Shop</h1>
            </div>
        </footer>
    );
}
export default Footer;