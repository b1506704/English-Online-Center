import {React, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import './HeadingTitle.css';

const HeadingTitle = ({title, subtitle}) => {
    const {url} = useRouteMatch();
    const currentUserInfo = useSelector ((state) => state.user_reducer.loggedInUser);
    const [userMode, setUserMode] = useState('');

    useEffect(() => {
        if (currentUserInfo) {
            if(currentUserInfo.isUser) {
                setUserMode('user');
            } else if(currentUserInfo.isCoacher) {
                setUserMode('coacher');    
            } else if(currentUserInfo.isHRManager) {
                setUserMode('hr');    
            } else if(currentUserInfo.isMarketingManager) {
                setUserMode('marketing');    
            } else if(currentUserInfo.isAcademicManager) {
                setUserMode('academic');    
            } else if(currentUserInfo.isSalesManager) {
                setUserMode('sales');    
            } else if(currentUserInfo.isCenterManager) {
                setUserMode('center');    
            }
        }
        return () => {
            setUserMode('');
        }
    },[currentUserInfo]);

    const renderUserMenu = (
                    <>
                        <nav>
                            <Link className="shadow" to={`${url}`}>Home</Link>  
                            <Link className="shadow" to={`${url}/course`}>Course</Link>
                            <Link className="shadow" to={`${url}/room`}>Room</Link>
                            <Link className="shadow" to={`${url}/progress`}>Progress</Link>
                            <Link className="shadow" to={`${url}/information`}>Information</Link>
                        </nav>
                    </>
                    );

    const renderCoacherMenu = (
                    <>
                        <nav>
                            <Link className="shadow" to={`${url}`}>Home</Link>
                            <Link className="shadow" to={`${url}/student`}>Student</Link>
                            <Link className="shadow" to={`${url}/room`}>Room</Link>
                            <Link className="shadow" to={`${url}/test`}>Test</Link>
                            <Link className="shadow" to={`${url}/files`}>Files</Link>
                        </nav>
                    </>
                    );
    const renderHRMenu = (
                    <>
                        <nav>
                            <Link to={`${url}/employee`}>Employee</Link>
                            <Link to={`${url}/contact`}>Contact</Link>
                            <Link to={`${url}/recruitment`}>Recruitment</Link>
                            <Link to={`${url}/report`}>Report</Link>
                        </nav>
                    </>
                    );
    const renderAcademicMenu = (
        <>
            <nav>
                <Link to={`${url}/course`}>Course</Link>
                <Link to={`${url}/test`}>Test</Link>
                <Link to={`${url}/coacher`}>Coacher</Link>
                <Link to={`${url}/curriculum`}>Curriculum</Link>
            </nav>
        </>
        );
    const renderSalesMenu = (
            <>
                <nav>
                    <Link to={`${url}/income`}>Income</Link>
                    <Link to={`${url}/payment`}>Payment</Link>
                    <Link to={`${url}/discount`}>Discount</Link>
                    <Link to={`${url}/report`}>Report</Link>
                </nav>
            </>
            );
    const renderCenterMenu = (
        <>
            <nav>
                <Link to={`${url}/employee`}>Employee</Link>
                <Link to={`${url}/schedule`}>Schedule</Link>
                <Link to={`${url}/activity`}>Activity</Link>
                <Link to={`${url}/maintenance`}>Maintenance</Link>
            </nav>
        </>
        );
    const renderMarketingMenu = (
        <>
            <nav>
                <Link to={`${url}/advertisement`}>Advertisement</Link>
                <Link to={`${url}/affliation`}>Affliation</Link>
                <Link to={`${url}/report`}>Report</Link>
            </nav>
        </>
        );
    
    const renderMenu = () => {
        switch (userMode) {
            case "user":
                return renderUserMenu;
            case "coacher":
                return renderCoacherMenu;
            case "hr":
                return renderHRMenu;
            case "sales":
                return renderSalesMenu;
            case "academic":
                return renderAcademicMenu;
            case "center":
                return renderCenterMenu;
            case "marketing":
                return renderMarketingMenu;
            default:
                return (
                    <>
                        <h2> {title} </h2>
                        <p> {subtitle} </p>
                    </>
                );
        }
    }
    
    return(
        <div className="heading_container shadow corner_box corner_box_e">
            {renderMenu()}
        </div>
    );
}
export default HeadingTitle;