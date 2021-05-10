import React from 'react';

import './Footer.css';

const Footer = () => {
    const date = new Date();
    return(
        <footer className="shadow">
            {/* <h2>&copy; { date.getFullYear() }, English Online Center. Developed by Le Bao Anh - B1506704 from CTU </h2> */}
            <h2>&copy; { date.getFullYear() }, Active Learning Center. Developed by Le Bao Anh - B1506704 from CTU </h2>
        </footer>
    );
}
export default Footer;