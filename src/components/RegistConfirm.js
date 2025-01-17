import React, { createContext, useContext, useState } from "react"
import "../App.css";
import "./Registration.css";
import "./RegistConfirm.css";

import ContentBox from "./ContentBox";
import { usePendingSubject, useSetPendingSubject } from "../hooks";
import { Link } from "react-router-dom";

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
    const { mutate: setPendingSubject } = useSetPendingSubject();
    if (isLoading) { return null; }

    const CourseRow_list =
        chosenCourses.map((courseData, index) => <CourseRow key={courseData.subject.id} courseData={courseData} index={index + 1}
            onDeleteClick={() => {
                const out_sub =
                    chosenCourses.map(x => ({ subject_id: x.subject.id, number: x.number, year: 2021 }));
                out_sub.splice(index, 1); //deletew 1 items at the index
                console.log(out_sub);
                setPendingSubject(out_sub);
            }} />);

    return (
        <chosenCoursesCtx.Provider value={{}}>
            <div className="heading">รายวิชาที่ต้องการลงทะเบียนเรียน</div>
            <ContentBox title="รายวิชาที่ต้องการลงทะเบียนเรียน" content={
                <>
                    <TableCtn content={CourseRow_list} />
                    <BackBtn />
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
                    <th className="cell1" style={{ width: '8%' }}>ลำดับที่</th>
                    <th style={{ width: '30%' }}>รหัสรายวิชา</th>
                    <th style={{ width: '32%' }}>ชื่อย่อรายวิชา</th>
                    <th style={{ width: '10%' }}>ตอนเรียน</th>
                    <th style={{ width: '10%' }}>หน่วยกิต</th>
                    <th style={{ width: '10%' }} className="invisCell"></th>
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
            {props?.noDelete || <td className="invisCell"><button className="removeBtn" style={{ cursor: "pointer" }} onClick={props.onDeleteClick}>ลบ</button></td>}
        </tr>
    )
}

const BackBtn = () => {
    return (
        <Link to="/Subject/Registration">
            <button className="btn2">แก้ไข</button>
        </Link >
    )
}


//-----------------------------------------------------------------//

export default RegistConfirm