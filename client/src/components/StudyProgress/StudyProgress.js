import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './StudyProgress.css';
import ProgressChart from '../Chart/Chart';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import random from '../../utils/RandomNumber';

const StudyProgress = () => {
    const modalRef = useRef();
    const testList = useSelector((state) => state.user_reducer.testList);
    const currentUser = useSelector((state) => state.user_reducer.currentUser);
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const [myRoom, setMyRoom] = useState(
        roomList.filter((r) => r.roomParticipants.some((p) => p === currentUser.userName))
    );
    const [myTest, setMyTest] = useState(
        testList.filter((t) => t.record.some((r) => r.userName === currentUser.userName))
    );

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
                            data={testList?.map((t) => t.maxScore)}
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
                    <div>Registered Room :&nbsp; <span>{myRoom?.length}</span></div>
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
                        testList != null && testList.length != 0 ? 
                        testList.map ((test,key) =>
                        <div className="chart_container shadow" key={key}>
                            <h2>{test.name}</h2> 
                            <ProgressChart
                                type="pie"
                                label="Overall correct"
                                labels={['Correct','Incorrect']}
                                // data={[test.record[0].answerSheet.length/test.record[0].score,test.record[0].answerSheet.length ]}
                                data={[64,36]}
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