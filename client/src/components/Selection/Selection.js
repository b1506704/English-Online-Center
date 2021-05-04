import React from 'react';
import { Link } from 'react-router-dom';
import './Selection.css';

const Selection = ({user}) => {
  return (
    <div className="selection_container">
      <div>
      <Link to={user === "coacher" ? '/coacher/student' : user === "user" ? '/user/course' : null }>
        <button type="button" className="box">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <line className="top" x1="0" y1="0" x2="900" y2="0"/>
            <line className="left" x1="0" y1="460" x2="0" y2="-920"/>
            <line className="bottom" x1="300" y1="460" x2="-600" y2="460"/>
            <line className="right" x1="300" y1="0" x2="300" y2="1380"/>
          </svg>
          <h3>{user === "coacher" ? "Student" : user === "user" ? "Course" : null}</h3>
          <span>__________</span>
          <span>{user === "coacher" ? "Student Management" : user === "user" ? "Course List" : null}</span>
        </button>
      </Link>
      <Link to={user === "coacher" ? '/coacher/room' : user === "user" ? '/user/room' : null }>
        <button type="button" className="box">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <line className="top" x1="0" y1="0" x2="900" y2="0"/>
            <line className="left" x1="0" y1="460" x2="0" y2="-920"/>
            <line className="bottom" x1="300" y1="460" x2="-600" y2="460"/>
            <line className="right" x1="300" y1="0" x2="300" y2="1380"/>
          </svg>
          <h3>Room</h3>
          <span>__________</span>
          <span>{user === "coacher" ? "Room Management" : user === "user" ? "Room List" : null}</span>
        </button>
      </Link>
      </div>
      <div>
      <Link to={user === "coacher" ? '/coacher/test' : user === "user" ? '/user/progress' : null }>
        <button type="button" className="box">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <line className="top" x1="0" y1="0" x2="900" y2="0"/>
            <line className="left" x1="0" y1="460" x2="0" y2="-920"/>
            <line className="bottom" x1="300" y1="460" x2="-600" y2="460"/>
            <line className="right" x1="300" y1="0" x2="300" y2="1380"/>
          </svg>
          <h3>{user === "coacher" ? "Test" : user === "user" ? "Progress" : null}</h3>
          <span>__________</span>
          <span>{user === "coacher" ? "Test Management" : user === "user" ? "Study Progress" : null}</span>
        </button>
      </Link>
      <Link to={user === "coacher" ? '/coacher/file' : user === "user" ? '/user/information' : null }>
        <button type="button" className="box">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <line className="top" x1="0" y1="0" x2="900" y2="0"/>
            <line className="left" x1="0" y1="460" x2="0" y2="-920"/>
            <line className="bottom" x1="300" y1="460" x2="-600" y2="460"/>
            <line className="right" x1="300" y1="0" x2="300" y2="1380"/>
          </svg>
          <h3>{user === "coacher" ? "File" : user === "user" ? "Information" : null}</h3>
          <span>__________</span>
          <span>{user === "coacher" ? "File Management" : user === "user" ? "Exam Information" : null}</span>
        </button>
      </Link>
      </div>
    </div>
  );
}
export default Selection;
