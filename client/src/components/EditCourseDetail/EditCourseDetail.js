import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditCourseDetail.css';
import random from '../../utils/RandomNumber.js';
import { fetchCourse, fetchTest, setNotification, updateCourse } from '../../actions/user_actions';

const CourseDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const courseList = useSelector((state) => state.user_reducer.courseList);
    const testList = useSelector((state) => state.user_reducer.testList);
    const [currentImg, setCurrentImg] = useState(null);
    const [currentTestList, setCurrentTestList] = useState([]);
    const [currentLessonList, setCurrentLessonList] = useState([]);
    const [course, setCourse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const courseRef = {
        name: useRef(null),
        description: useRef(null),
        duration: useRef(null),
    };

    useEffect(() => {
        if (courseList === undefined || courseList === null) {
            history.push('/course');
        } else {
            setCourse(courseList.find((course) => course.id === id));
            setCurrentTestList(courseList.find((course) => course.id === id).testList);
            setCurrentLessonList(courseList.find((course) => course.id === id).lessonList);
        }
    },[courseList]);
        
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
    
    const editTest = (e, id) => {
        const currentIndex = currentTestList.findIndex((t) => t.id === id);
        console.log(currentIndex);
        console.log(e.target.value);
        const tempList = [...currentTestList];
        console.log(tempList);
        const toEditTest = testList.find((t) => t.id === e.target.value);
        tempList[currentIndex] = toEditTest;
        setCurrentTestList(tempList);
    }

    const editLesson = (e, id) => {
        //todo
    }

    const onRemoveTest = (id) => {
        setCurrentTestList(currentTestList.filter((t) => t.id != id));
        dispatch(setNotification("Test removed"));
    }

    const onRemoveLesson = (id) => {
        setCurrentTestList(currentLessonList.filter((l) => l.id != id));
        dispatch(setNotification("Lesson removed"));
    }

    const onEdit = () => {
        setIsEditing(true);
        dispatch(setNotification("Edit Mode: On"));
    }

    const onCancel = () => {
        setCurrentTestList(courseList.find((course) => course.id === id).testList);
        setCurrentLessonList(courseList.find((course) => course.id === id).lessonList);
        setIsEditing(false);
        dispatch(setNotification("Cancel operation"));
    }

    const onUpdate = () => {
        const updatedCourse = {
            name: courseRef.name.current.value,
            description: courseRef.description.current.value,
            imgUrl: currentImg || course.imgUrl,
            duration: courseRef.duration.current.value,
            lessonList:  currentLessonList,
            testList:  currentTestList
          };
        dispatch(updateCourse(course.id, updatedCourse))
        .then(() => dispatch(fetchCourse()))
        .then(() => setIsEditing(false));
    }
    
    const onInsertTest = () => {
        console.log(currentTestList.length);
        console.log(testList.length);
        if (currentTestList.length < testList.length) {
            const test = testList[random(0, testList.length-1)];
            setCurrentTestList([...currentTestList, test]);
            console.log(currentTestList);
            dispatch(setNotification("Test added"));
        } else {
            dispatch(setNotification(`Maximum of ${testList.length}`));
        }
    }

    const onInsertLesson = () => {
        //todo        
        dispatch(setNotification("Lesson added"));
    }

    const loadCourse = () => {
        dispatch(fetchCourse())
        .then(() => dispatch(setNotification("Refresh successfully")));
    }

    
    const renderTests = () => {
        let tests;
        if (isEditing) {
            tests = currentTestList
                            ?.map((test, key) => 
                            (<div className="test shadow" key={key}>
                                <div className="test_title">
                                    <span> {key+1}. </span>
                                    <select defaultValue={currentTestList.find((t)=>t.id === test.id).id} onChange={(e) => editTest(e, test.id)}>
                                        {testList?.map((t, key) => 
                                            (<option key={key} value={t.id}>{t.name}</option>)
                                        )}
                                    </select>
                                    <button type="button" className="delete_button shadow" onClick={() => onRemoveTest(test.id)}/>   
                                </div>
                            </div>));
        } else {
            tests = course?.testList
                            .map((test, key) => 
                            (<div className="test shadow" key={key}> 
                                <div className="test_title">
                                    <a style={{width: "100%"}} onClick={() => history.push(`/coacher/test/${test.id}`)}>
                                    {key+1}. {test.name}
                                    </a>
                                </div>
                            </div>));
        }
        return tests;
    }

    const renderLessons = () => {
        let lessons;
        if (isEditing) {
            lessons = currentTestList
                            ?.map((test, key) => 
                            (<div className="test shadow" key={key}>
                                <div className="test_title">
                                    <span> {key+1}. </span>
                                    <select defaultValue={currentTestList.find((t)=>t.id === test.id).id} onChange={(e) => editTest(e, test.id)}>
                                        {testList?.map((t, key) => 
                                            (<option key={key} value={t.id}>{t.name}</option>)
                                        )}
                                    </select>
                                    <button type="button" className="delete_button shadow" onClick={() => onRemoveTest(test.id)}/>   
                                </div>
                            </div>));
        } else {
            lessons = course?.testList
                            .map((test, key) => 
                            (<div className="test shadow" key={key}> 
                                <div className="test_title">
                                    <a style={{width: "100%"}} onClick={() => history.push(`/coacher/test/${test.id}`)}>
                                    {key+1}. {test.name}
                                    </a>
                                </div>
                            </div>));
        }
        return lessons;
    }

    return(
        <div className="course_detail_page shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h2 className={isEditing ? "course_message corner_box_animation shadow" : "course_message shadow"}>
                Course Editor
                <div className="button_group">
                    {
                        isEditing ? 
                        <>
                            <button type="button" className="cancel_button shadow" onClick={onCancel}></button>        
                            <button type="button" className="save_button shadow" onClick={onUpdate}></button>        
                            <button type="button" className="add_button shadow" onClick={onInsertTest}></button>        
                        </> :
                        <>
                            <button type="button" className="edit_button shadow" onClick={onEdit}></button>
                        </> 
                    }
                    <button type="button" className="refresh_button shadow" onClick={loadCourse}></button>            
                </div>
            </h2>
            <div className="course_detail">
                <div className="detail_media shadow">
                    <h2>Course Cover</h2>
                    <img className="image" alt="Loading..." src={currentImg || course?.imgUrl}/>
                </div>
                <div className="detail_info shadow">
                    <h2>Preview</h2>
                    <div>Title:&nbsp; 
                        { isEditing === false ? <span>{course?.name}</span>
                            : (<input ref={courseRef.name} type="text" required defaultValue={course?.name}></input>)
                        }
                        
                    </div>
                    <div>Total Test:&nbsp; <span>{course?.testList.length ? course.testList.length : "0"}</span></div>
                    <div>Total Lesson:&nbsp; <span>{course?.lessonList.length ? course.lessonList.length : "0"}</span></div>
                    <div>Duration:&nbsp; 
                        { isEditing === false ? <span>{course?.duration} weeks</span>
                            : (<input ref={courseRef.duration} type="number" required defaultValue={course?.duration}></input>)
                        }
                        
                    </div>
                    <h2>Description</h2>
                    <textarea ref={courseRef.description} disabled={!isEditing} required defaultValue={course?.description}></textarea>
                </div>
            </div>
            <div className="content_container">
                <div className="test_container">
                    <h2>Available Test</h2>
                    <div className="tests">
                        {testList.map((t, key) => 
                        (<a className="test" onClick={() => history.push(`/coacher/test/${t.id}`)} key={key}>
                            <div className="test_title">{key+1}. {t.name}</div>
                        </a>))}
                    </div>
                </div>
                <div className="test_container">
                    <h2>Test List</h2>
                    <div className="tests">
                        {renderTests()}
                    </div>
                </div>
                <div className="test_container">
                    <h2>Lesson List</h2>
                    <div className="tests">
                        {renderLessons()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CourseDetail;