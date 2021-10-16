import React, { createContext, useContext, useState } from "react"
import "../App.css";
import "./Registration.css";
import "./RegistConfirm.css";

import ContentBox from "./ContentBox";
import { usePendingSubject } from "../hooks";

var q = (id) => document.getElementById(id)

//-------------------ลองข้อมูล-- แสดงวิชาที่เลือก--------------//
/*
var chosenCourses = [
    {
        "courseName": "Alchemy I",
        "courseNo": "2356789",
        "credits": 6,
        "selectedSect": 3
    },
    {
        "courseName": "Astrology I",
        "courseNo": "2398765",
        "credits": 3,
        "selectedSect": "only"
    },
    {
        "courseName": "Magic Spell I",
        "courseNo": "2309987",
        "credits": 5,
        "selectedSect": "1"
    }
]
*/


const chosenCoursesCtx = createContext();
const RegistConfirm = () => { //-----------main-------------------------------------------------------------//
    const { data: chosenCourses, isLoading } = usePendingSubject();
    if (isLoading) { return null; }

    const CourseRow_list =
        chosenCourses.map((courseData, index) => <CourseRow courseData={courseData} index={index + 1} />);

    return (
        <chosenCoursesCtx.Provider value={{}}>
            <div className="heading">รายวิชาที่ต้องการลงทะเบียนเรียน</div>
            <ContentBox title="รายวิชาที่ต้องการลงทะเบียนเรียน" content={
                <>
                    <TableCtn content={CourseRow_list} />

                </>
            } />

        </chosenCoursesCtx.Provider>
    )
}

//--------------------------------------------------------------//
export const TableCtn = (props) => {
    return (
        <div className="cardCtn" id="cardCtn">
            <table className="table1">
                <tr>
                    <th>ลำดับที่</th>
                    <th>รหัสรายวิชา</th>
                    <th>ชื่อย่อรายวิชา</th>
                    <th>ตอนเรียน</th>
                    <th>หน่วยกิต</th>
                    {props?.noDelete || <th className="invisCell"></th>}
                </tr>
                {props.content}
            </table>

        </div>
    )
}

export const CourseRow = (props) => {
    const courseData = props.courseData;

    return (
        <tr>
            <td>{props.index}</td>
            <td>{courseData.subject.id}</td>
            <td>{courseData.subject.name_english}</td>
            <td>{courseData.number}</td>
            <td>{courseData.subject.credit}</td>
            {props?.noDelete || <td><button style={{ cursor: "pointer" }} onClick={props.onDeleteClick}>ลบ</button></td>}
        </tr>
    )
}

//-----------------------------------------------------------------//

export default RegistConfirm