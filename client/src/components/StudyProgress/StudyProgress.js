import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './StudyProgress.css';
import ProgressChart from '../Chart/Chart';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import random from '../../utils/RandomNumber';

const StudyProgress = () => {
    const modalRef = useRef();
    const testList = useSelector((state) => state.user_reducer.testList);
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const correctNum = () => random(45,100);
    
    useEffect(() => {
        scrollToModal();
    },[]);


    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };
    
    return(
        <div className="progress_page">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h2 className="progress_message neon shadow">
                Overall Progress            
            </h2>
            <div className="progress_detail shadow">
                <div className="detail_media shadow">
                    <h2>Statistic</h2>
                    <div className="chart">
                        <ProgressChart
                            type="bar"
                            label="% of completion"
                            labels={testList?.map((t) => t.name)}
                            data={[100,25,55,66,33]}
                            scales={{
                                yAxes: [
                                  {
                                    ticks: {
                                      beginAtZero: true
                                    }
                                  }
                                ]
                              }}
                        />
                    </div>
                </div>
                <div className="detail_info shadow">
                    <h2>Record</h2>
                    <div>Registered Room :&nbsp; <span>{roomList?.length}</span></div>
                    <div>Attended Test:&nbsp; <span>{testList?.length}</span></div>
                    <div>Best Performance:&nbsp; <span>{testList[0]?.name}</span></div>
                    <div>Grade:&nbsp; <span>{"A"}</span></div>
                </div>
                    
            </div>
            <h2 className="progress_message shadow">
                Detail Information
            </h2>
            <div className="content_container shadow">
                {
                        testList != null && testList.length != 0? 
                        testList.map ((test,key) =>
                        <div className="chart_container shadow" key={key}>
                            <h2>{test.name}</h2> 
                            <ProgressChart
                                type="pie"
                                label="Overall %"
                                labels={['Correct','Incorrect']}
                                data={[correctNum(),100-correctNum()]}
                                scales={{}}
                            />
                        </div>
                            )
                        : (<LoadingContainer style={'spinner'}/>)
                }
            </div>
      </div>
    );
}
export default StudyProgress;