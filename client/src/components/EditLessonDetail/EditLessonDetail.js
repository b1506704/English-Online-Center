import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditLessonDetail.css';
import random from '../../utils/RandomNumber.js';
import { fetchTest, setNotification, updateTest } from '../../actions/user_actions';
import Test from '../../assets/imgs/test.jpg';
import Practice from '../../assets/imgs/practice.jpg';
import FlashCard from '../FlashCard/FlashCard';

const LessonDetail = () => {
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
        text: useRef(null),
        isAudio: useRef(null),
        isVideo: useRef(null),
        answerOptions: useRef(null),
    };
    const testRef = {
        name: useRef(null),
        description: useRef(null),
        maxScore: useRef(null),
        duration: useRef(null),
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
        const updatedTest = {
            name: testRef.name.current.value || test.name,
            description: testRef.description.current.value || test.description,
            maxScore: testRef.maxScore.current.value || test.maxScore,
            duration: testRef.duration.current.value || test.duration,
            isPractice:  testRef.isPractice.current.value || testRef.isPractice,
            questions: testRef.questions.current.value || test.question,
          };
            dispatch(updateTest(test.id, updatedTest))
            .then(() => setIsEditing(false));
        // e.preventDefault();
        // dispatch update test
        // then setIsEdit false
    }

    const onInsert = () => {

        // to do
    }

    const loadTest = () => {
        dispatch(fetchTest())
        .then(() => dispatch(setNotification("Refresh successfully")));
    }

    const convertNumToLetter = (key) => {
        switch (key) {
            case 1:
                return "A";
            case 2:
                return "B";
            case 3:
                return "C";
            case 4:
                return "D";
            default:
                break;
        }
    }

    const renderQuestions = () => {
        const sampleAnswer = [
            {value: 'Ha NoiHa NoiHa NoiHa NoiHa NoiHa NoiHa NoiHa Noi', isCorrect: true},
            {value: 'Ho Chi Minh', isCorrect: false},
            {value: 'Can Tho', isCorrect: false},
            {value: 'Hue', isCorrect: false},
        ];
        const question = [
        {
            id: random(1,20000),
            text: 'What is the capital of Vietnam?',
            isAudio: false,
            isVideo: false,
            answerOptions: sampleAnswer,
        },
        {
            id: random(1,20000),
            text: 'What is the capital of Italy?',
            isAudio: false,
            isVideo: false,
            answerOptions: sampleAnswer,
        }
        ];
        const questions = question
        // const questions = test?.questions
                            .map((question, key) => 
                            (<div className="question shadow" key={key}> 
                                <div className="question_title">{key + 1}. {question.text}</div>
                                <div className="question_answer">
                                    {question?.answerOptions.map((answer,key) => 
                                    (<div> 
                                        {convertNumToLetter(key+1)}. {answer.value}
                                    </div>))
                                    }
                                </div>
                            </div>));
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
                    <div>Title:&nbsp; 
                        { isEdit === false ? <span>{test?.name}</span>
                            : (<input ref={testRef.name} type="text" required defaultValue={test?.name}></input>)
                        }
                        
                    </div>
                    <div>Type:&nbsp; 
                        { isEdit === false ? <span>{test?.isPractice ? "Practice" : "Test"}</span>
                            : (<input ref={testRef.isPractice} type="checkbox" required defaultValue={test?.isPractice}>

                            </input>)
                        }
                        
                    </div>
                    <div>Total Questions:&nbsp; <span>{test?.questions.length ? test.questions.length : "0"}</span></div>
                    <div>Total Score:&nbsp; 
                        { isEdit === false ? <span>{test?.maxScore}</span>
                            : (<input ref={testRef.maxScore} type="number" required defaultValue={test?.maxScore}></input>)
                        }
                        
                    </div>
                    <div>Duration:&nbsp; 
                        { isEdit === false ? <span>{test?.duration} minutes</span>
                            : (<input ref={testRef.duration} type="number" required defaultValue={test?.duration + "minutes"}></input>)
                        }
                        
                    </div>
                    
                    <h2>Description</h2>
                    <textarea ref={testRef.description} disabled={!isEdit} required defaultValue={test?.description}></textarea>
                </div>
            </div>
            {/* <h2 className="test_content shadow">
                Test Content
            </h2> */}
            <div className="content_container">
                <div className="question_container">
                    {/* <input type="button" className="shadow neon" value="Remove All" onClick={onRemoveAll}></input>
                    <input type="button" className="shadow neon" value="Insert" onClick={onInsert}></input>
                    { isEdit ? <>
                        <input type="submit" className="shadow neon" value="Save"></input>
                        <input type="button" className="shadow neon" value="Cancel" onClick={onCancel}></input>
                        </> : (<input type="button" className="shadow neon" value="Edit" onClick={onEdit}></input>)
                    } */}
                    <h2>Questions</h2>
                    {/* <div className="questions">
                        {renderQuestions()}
                    </div> */}
                    <FlashCard/>
                </div>
            </div>
        </div>
    );
}
export default LessonDetail;