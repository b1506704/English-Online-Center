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
    const testList = useSelector((state) => state.user_reducer.testList);
    const [questionList, setQuestionList] = useState([]);
    const [test, setTest] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
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
            setQuestionList(testList.find((test) => test.id === id).questions);
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
    
    const editQuestion = (e, id) => {
        const currentIndex = questionList.findIndex((q) => q.id === id);
        const tempList = [...questionList];
        tempList[currentIndex].text = e.target.value;
        setQuestionList(tempList);
    }

    const markCorrect = (e, id) => {
        const currentIndex = questionList.findIndex((q) => q.id === id);
        const tempList = [...questionList];
        const currentAnswerIndex = parseInt(e.target.value);
        tempList[currentIndex].answerOptions.forEach(e => {
            e.isCorrect = false;
        });
        tempList[currentIndex].answerOptions[currentAnswerIndex].isCorrect = true;
        console.log(tempList[currentIndex].answerOptions[currentAnswerIndex]);
        setQuestionList(tempList);
    }

    const editAnswer = (e, id, key) => {
        const currentIndex = questionList.findIndex((q) => q.id === id);
        const tempList = [...questionList];
        tempList[currentIndex].answerOptions[key].value = e.target.value;
        setQuestionList(tempList);
    }

    const onRemove = (id) => {
        setQuestionList(questionList.filter((q) => q.id != id));
        dispatch(setNotification("Question removed"));
    }

    const onEdit = () => {
        setIsEditing(true);
        dispatch(setNotification("Edit Mode: On"));
    }

    const onCancel = () => {
        setQuestionList(testList.find((test) => test.id === id).questions);
        setIsEditing(false);
        dispatch(setNotification("Cancel operation"));
    }

    const onUpdate = () => {
        const updatedTest = {
            name: testRef.name.current.value || test.name,
            description: testRef.description.current.value || test.description,
            maxScore: testRef.maxScore.current.value || test.maxScore,
            duration: testRef.duration.current.value || test.duration,
            isPractice:  testRef.isPractice.current.value || testRef.isPractice,
            questions: questionList || test.questions,
          };
            dispatch(updateTest(test.id, updatedTest))
            .then(() => dispatch(fetchTest()))
            .then(() => setIsEditing(false));
    }
    
    const onInsert = () => {
        const sampleAnswer = [
            {value: 'Choice 1th', isCorrect: true},
            {value: 'Choice 2th', isCorrect: false},
            {value: 'Choice 3th', isCorrect: false},
            {value: 'Choice 4th', isCorrect: false},
        ];
        const question = 
        {
            id: random(1,20000),
            text: 'Insert your question here?',
            isAudio: false,
            isVideo: false,
            answerOptions: sampleAnswer,
        };
        setQuestionList([...questionList, question]);
        dispatch(setNotification("Question added"));
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
        let questions;
        if (isEditing) {
            questions = questionList
                            ?.map((question, key) => 
                            (<div className="question shadow" key={key}>
                                <div className="question_title">
                                    <input defaultValue={question.text} onChange={(e) => editQuestion(e, question.id)}></input>
                                    <span> Correct Answer: </span>
                                    <select onChange={(e) => markCorrect(e, question.id)}>
                                        <option value="0">A</option>
                                        <option value="1">B</option>
                                        <option value="2">C</option>
                                        <option value="3">D</option>
                                    </select>
                                    <button type="button" className="delete_button shadow" onClick={() => onRemove(question.id)}/>   
                                </div>
                                <div className="question_answer">
                                    {question?.answerOptions.map((answer,key) => 
                                    (<div key={key}> 
                                        <input defaultValue={answer.value} onChange={(e) => editAnswer(e, question.id, key)}></input>
                                    </div>))
                                    }
                                </div>
                            </div>));
        } else {
            questions = test?.questions
                            .map((question, key) => 
                            (<div className="question shadow" key={key}> 
                                <div className="question_title">
                                    {key + 1}. {question.text}
                                    <span>Correct Answer: {question.answerOptions.find((q) => q.isCorrect === true).value}</span>
                                </div>
                                <div className="question_answer">
                                    {question?.answerOptions.map((answer,key) => 
                                    (<div key={key}> 
                                        {convertNumToLetter(key+1)}. {answer.value}
                                    </div>))
                                    }
                                </div>
                            </div>));
            
        }
        return questions;
    }
    
    

    return(
        <div className="test_detail_page shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h2 className={isEditing ? "test_message corner_box_animation shadow" : "test_message shadow"}>
                Test Editor
                <div className="button_group">
                    {
                        isEditing ? 
                        <>
                            <button type="button" className="cancel_button shadow" onClick={onCancel}></button>        
                            <button type="button" className="save_button shadow" onClick={onUpdate}></button>        
                            <button type="button" className="add_button shadow" onClick={onInsert}></button>        
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
                        { isEditing === false ? <span>{test?.name}</span>
                            : (<input ref={testRef.name} type="text" required defaultValue={test?.name}></input>)
                        }
                        
                    </div>
                    <div>Practice:&nbsp; 
                        { isEditing === false ? <span>{test?.isPractice ? "Yes" : "No"}</span>
                            : (<span>
                                <select ref={testRef.isPractice}>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </span>)
                        }
                        
                    </div>
                    <div>Total Questions:&nbsp; <span>{test?.questions.length ? test.questions.length : "0"}</span></div>
                    <div>Total Score:&nbsp; 
                        { isEditing === false ? <span>{test?.maxScore}</span>
                            : (<input ref={testRef.maxScore} type="number" required defaultValue={test?.maxScore}></input>)
                        }
                        
                    </div>
                    <div>Duration:&nbsp; 
                        { isEditing === false ? <span>{test?.duration} minutes</span>
                            : (<input ref={testRef.duration} type="number" required defaultValue={test?.duration}></input>)
                        }
                        
                    </div>
                    
                    <h2>Description</h2>
                    <textarea ref={testRef.description} disabled={!isEditing} required defaultValue={test?.description}></textarea>
                </div>
            </div>
            <div className="content_container">
                <div className="question_container">
                    <h2>Questions</h2>
                    <div className="questions">
                        {renderQuestions()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TestDetail;