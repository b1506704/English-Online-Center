import React from 'react';

import './LoadingContainer.css';

const LoadingContainer = ({style}) => {
    switch (style) {
        case 'bar':
            return(
                <div className="bar_loader neon shadow">
                    Loading...            
                </div>
            );
        case 'spinner':
            return(
                <div className="spinner_loader neon shadow">
                    Loading...            
                </div>
            );
        case 'dot':
            return(
                <div className="dot_loader neon shadow">
                    Loading...            
                </div>
            );
        default:
            return(
                <div className="bar_loader neon shadow">
                    Loading...            
                </div>
            );
    }
    
}
export default LoadingContainer;