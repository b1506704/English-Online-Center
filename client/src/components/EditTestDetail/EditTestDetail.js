import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditTestDetail.css';
import random from '../../utils/RandomNumber.js';
import { fetchTest, setNotification, updateTest } from '../../actions/user_actions';
import Test from '../../assets/imgs/test.jpg';
import Practice from '../../assets/imgs/practice.jpg';

const TestDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    // const currentUser = useSelector((state) => state.user_reducer.loggedInUser);
    const testList = useSelector((state) => state.user_reducer.testList);
    const [questionList, setQuestionList] = useState([]);
    const [test, setTest] = useState(null);
    const [isEdit, setisEdit] = useState(false);
    const questionRef = {
        id: useRef(null),
        text: useRef(null),
        isAudio: useRef(null),
        isVideo: useRef(null),
        answerOptions: useRef(null),
    };
    const testRef = {
        name: useRef(null),
        description: useRef(null),
        questions: useRef(null),
        isPractice: useRef(null),
    };

    useEffect(() => {
        if (testList === undefined || testList === null) {
            history.push('/test');
        } else {
            setTest(testList.find((test) => test.id === id));
        }
    },[testList]);

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
    
    const editQuestion = () => {
        // to do
    }

    const onRemoveAll = () => {
        // to do
    }

    const onEdit = () => {
        setisEdit(true);
    }

    const onCancel = () => {
        setisEdit(false);
    }

    const onUpdate = () => {
        // e.preventDefault();
        // dispatch update test
        // then setIsEdit false
    }

    const onInsert = () => {
        const sampleAnswer = [
            {value: 'Ha Noi', isCorrect: true},
            {value: 'Ho Chi Minh', isCorrect: false},
            {value: 'Can Tho', isCorrect: false},
            {value: 'Hue', isCorrect: false},
        ];
        const question = {
            id: random(1,20000),
            text: 'What is the capital of Vietnam?',
            isAudio: false,
            isVideo: false,
            answerOptions: sampleAnswer,
        }

        // to do
    }

    const loadTest = () => {
        dispatch(fetchTest())
        .then(() => dispatch(setNotification("Refresh successfully")));
    }

    const renderQuestions = () => {
        const questions = test?.questions
                            .map((test, key) => 
                            (<a 
                                className="test shadow" key={key} 
                                onClick={editQuestion()}>
                                {key + 1}
                            </a>));
        return questions;
    }
    
    

    return(
        <div className="test_detail_page shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h2 className={isEdit ? "test_message corner_box_animation shadow" : "test_message shadow"}>
                Test Editor
                <div className="button_group">
                    {
                        isEdit ? 
                        <>
                            <button type="button" className="cancel_button shadow" onClick={onCancel}></button>        
                            <button type="button" className="save_button shadow" onClick={onUpdate}></button>        
                        </> :
                        <>
                            <button type="button" className="edit_button shadow" onClick={onEdit}></button>
                        </> 
                    }
                    <button type="button" className="refresh_button shadow" onClick={loadTest}></button>            
                </div>
            </h2>
            <div className="test_detail">
                <div className="detail_media shadow">
                    <h2>Test Cover</h2>
                    <img className="image" alt="Loading..." src={test?.isPractice ? Practice : Test}/>
                </div>
                <div className="detail_info shadow">
                    <h2>Preview</h2>
                    <div>Total Questions:&nbsp; <span>{test?.questions.length ? test.questions.length : "0"}</span></div>
                    <div>Type:&nbsp; <span>{test?.isPractice ? "Practice" : "Test"}</span></div>
                    <div>Name:&nbsp; <span>{test?.name}</span></div>
                    <h2>Description</h2>
                    <textarea disabled={!isEdit} value={test?.description}></textarea>
                </div>
            </div>
            <h2 className="test_content shadow">
                Test Content
            </h2>
            <div className="content_container">
                <form className="question_container" onSubmit={(e) => onUpdate(e)}>
                    {/* <input type="button" className="shadow neon" value="Remove All" onClick={onRemoveAll}></input>
                    <input type="button" className="shadow neon" value="Insert" onClick={onInsert}></input>
                    { isEdit ? <>
                        <input type="submit" className="shadow neon" value="Save"></input>
                        <input type="button" className="shadow neon" value="Cancel" onClick={onCancel}></input>
                        </> : (<input type="button" className="shadow neon" value="Edit" onClick={onEdit}></input>)
                    } */}
                    <h2>Questions</h2>
                    <div className="questions">
                        {renderQuestions()}
                    </div>
                </form>
            </div>
        </div>
    );
}
export default TestDetail;