import React from 'react';

import './Footer.css';

const Footer = () => {
    const date = new Date();
    return(
        <footer>
            <div className="content-wrapper">
                <h1>&copy; { date.getFullYear() }, English Online Center. Developed by Le Bao Anh - B1506704 from CTU </h1>
            </div>
        </footer>
    );
}
export default Footer;