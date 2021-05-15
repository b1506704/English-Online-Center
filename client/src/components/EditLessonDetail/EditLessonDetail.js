import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditLessonDetail.css';
import random from '../../utils/RandomNumber.js';
import { fetchLesson, setNotification, updateLesson } from '../../actions/user_actions';
import FlashCard from '../FlashCard/FlashCard';
import Vocabulary from '../../assets/imgs/vocabulary.jpg';
import Grammar from '../../assets/imgs/grammar.jpg';
import Listening from '../../assets/imgs/listening.jpg';
import Reading from '../../assets/imgs/reading.jpg';

const LessonDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const lessonList = useSelector((state) => state.user_reducer.lessonList);
    const [contentList, setContentList] = useState([]);
    const [lesson, setLesson] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const lessonRef = {
        name: useRef(null),
        description: useRef(null),
        type: useRef(null),
        duration: useRef(null),
    };

    useEffect(() => {
        if (lessonList === undefined || lessonList === null) {
            history.push('/curriculum');
        } else {
            setLesson(lessonList.find((lesson) => lesson.id === id));
            setContentList(lessonList.find((lesson) => lesson.id === id).content);
        }
    },[lessonList]);
        
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
    
    const editFront = (e, id) => {
        const currentIndex = contentList.findIndex((q) => q.id === id);
        const tempList = [...contentList];
        tempList[currentIndex].front.text = e.target.value;
        setContentList(tempList);
    }

    const editBack = (e, id) => {
        const currentIndex = contentList.findIndex((q) => q.id === id);
        const tempList = [...contentList];
        tempList[currentIndex].back.text = e.target.value;
        setContentList(tempList);
    }

    const onRemove = (id) => {
        setContentList(contentList.filter((c) => c.id != id));
        dispatch(setNotification("Content removed"));
    }

    const onEdit = () => {
        setIsEditing(true);
        dispatch(setNotification("Edit Mode: On"));
    }

    const onCancel = () => {
        setContentList(lessonList.find((lesson) => lesson.id === id).content);
        setIsEditing(false);
        dispatch(setNotification("Cancel operation"));
    }

    const onUpdate = () => {
        const updatedLesson = {
            name: lessonRef.name.current.value, 
            description: lessonRef.description.current.value ,
            isGrammar: lessonRef.type.current.value === "grammar" ? true : false,
            isVocabulary: lessonRef.type.current.value === "vocabulary" ? true : false ,
            isReading: lessonRef.type.current.value === "reading" ? true : false,
            isListening: lessonRef.type.current.value === "listening" ? true : false,
            duration: lessonRef.duration.current.value ,
            content: contentList
          };
        dispatch(updateLesson(lesson.id, updatedLesson))
        .then(() => dispatch(fetchLesson()))
        .then(() => setIsEditing(false));
    }
    
    const onInsert = () => {
        const sampleLesson = {
            id: random(1,20000),
            front: {
                text: 'Unrevealed word',
                image: ''
            },
            back: {
                text: 'Revealed word'
            },
        }
        setContentList([...contentList, sampleLesson]);
        dispatch(setNotification("Content added"));
    }

    const loadLesson = () => {
        dispatch(fetchLesson())
        .then(() => dispatch(setNotification("Refresh successfully")));
    }

    const renderContents = () => {
        let content;
        if (isEditing) {
            content = contentList
                            ?.map((content, key) => 
                            (<div className="lesson shadow" key={key}>
                                <div className="lesson_title">
                                    <span> Front Text: 
                                    <input defaultValue={content.front.text} onChange={(e) => editFront(e, content.id)}></input>
                                    </span>
                                    
                                    <button type="button" className="delete_button shadow" onClick={() => onRemove(content.id)}/>   
                                </div>
                                <div className="lesson_answer">
                                    <span> Back Text: 
                                    <input defaultValue={content.back.text} onChange={(e) => editBack(e, content.id)}></input>
                                    </span>
                                    
                                    {/* {content?.answerOptions.map((answer,key) => 
                                    (<div key={key}> 
                                        <input defaultValue={answer.value} onChange={(e) => editAnswer(e, content.id, key)}></input>
                                    </div>))
                                    } */}
                                </div>
                            </div>));
        } else {
            content = <FlashCard
                        dataSource={lesson?.content}
                        voice={"ja-JP"}
                        flipDirection="vertical" 
                        onChange={(step, side) => console.log(step, side)} 
                        onSound={(text) => console.log(text)} 
                        onFinish={() => console.log("Finish!")}
                        backgroundColor={""}
                        barColor={"rgba(255, 255, 255, 0.527)"}
                        cardColor={"rgba(255, 255, 255, 0.527)"}
                        textColor={"black"}
                        dropShadow={true}
                        height={450}
                        width={"100%"}
                    />;
        }
        return content;
    }

    return(
        <div className="lesson_detail_page shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h2 className={isEditing ? "lesson_message corner_box_animation shadow" : "lesson_message shadow"}>
                Lesson Editor
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
                    <button type="button" className="refresh_button shadow" onClick={loadLesson}></button>            
                </div>
            </h2>
            <div className="lesson_detail">
                <div className="detail_media shadow">
                    <h2>Lesson Cover</h2>
                    <img className="image" alt="Loading..." src={lesson?.isGrammar ? Grammar : lesson?.isVocabulary ? Vocabulary : lesson?.isReading ? Reading : lesson?.isListening ? Listening : null}/>
                </div>
                <div className="detail_info shadow">
                    <h2>Preview</h2>
                    <div>Title:&nbsp; 
                        { isEditing === false ? <span>{lesson?.name}</span>
                            : (<input ref={lessonRef.name} type="text" required defaultValue={lesson?.name}></input>)
                        }
                        
                    </div>
                    <div>Category:&nbsp; 
                        { isEditing === false ? <span>{lesson?.isGrammar ? "Grammar" : lesson?.isVocabulary ? "Vocabulary" : lesson?.isReading ? "Reading" : lesson?.isListening ? "Listening" : null}</span>
                            : (<span>
                                <select ref={lessonRef.type}>
                                    <option value={"grammar"}>Grammar</option>
                                    <option value={"vocabulary"}>Vocabulary</option>
                                    <option value={"reading"}>Reading</option>
                                    <option value={"listening"}>Listening</option>
                                </select>
                            </span>)
                        }
                        
                    </div>
                    <div>Total Units:&nbsp; <span>{lesson?.content.length ? lesson.content.length : "0"}</span></div>
                    <div>Minutes To Read:&nbsp; 
                        { isEditing === false ? <span>{lesson?.duration}</span>
                            : (<input ref={lessonRef.duration} type="number" required defaultValue={lesson?.duration}></input>)
                        }
                    </div>
                    <h2>Description</h2>
                    <textarea ref={lessonRef.description} disabled={!isEditing} required defaultValue={lesson?.description}></textarea>
                </div>
            </div>
            <div className="content_container">
                <div className="lesson_container">
                    <h2>Contents</h2>
                    <div className="lessons">
                        {renderContents()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LessonDetail;