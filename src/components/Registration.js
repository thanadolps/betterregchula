import React, { createContext, useContext, useMemo, useState } from "react"
import "../App.css";
import "./Registration.css";
import { Link } from 'react-router-dom'
import SubMenu from "./SubMenu";
import ContentBox from "./ContentBox";
import styled from 'styled-components';
import { useListSubjects, usePendingSubject, useSetPendingSubject } from "../hooks";

const ConfirmLink = styled(Link)`
margin-top:auto;
margin-bottom:auto;
`
var q = (id) => document.getElementById(id)

var Now = {
    chosens: [],
    searched: ''
};

//-------------------ลองข้อมูล----------------//
/*
var received = {
    courses: [{
        name: 'Calculus I',
        credits: 6,
        No: '2301123',
        sects: [1, 2, 3, 4, 5, 'any']
    }, {
        name: 'Magic Spell I',
        credits: 5,
        No: '2309987',
        sects: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
        name: 'Muggle Studies I',
        credits: 4,
        No: '2355566',
        sects: [1, 2, 3, 'only', 'any']
    }, {
        name: 'Alchemy I',
        credits: 6,
        No: '2356789',
        sects: [1, 2, 3, 4]
    }, {
        name: 'Astrology I',
        credits: 3,
        No: '2398765',
        sects: ['only']
    }]
}*/

const nowChosensCtx = createContext();
const Registration = () => { //-----------main-------------------------------------------------------------//
    var [nowChosens, setNowChosens] = useState([]); // global in this app for list of chosen courses
    const { data: subjects } = useListSubjects();
    const { data: pending_subjects } = usePendingSubject();

    if (subjects === undefined || pending_subjects === undefined) { return null; }

    var CourseCard_list = subjects.map((course) =>
        <CourseCard key={course.id} courseName={course.name_english} courseNo={course.id} credits={course.credit} sects={course.sections} />);

    return (
        <nowChosensCtx.Provider value={{ get: nowChosens, set: setNowChosens, subjects, pending_subjects }}>
            <div className="heading">ลงทะเบียนเรียน</div>
            <ContentBox title="ลงทะเบียนเรียน" content={
                <>
                    <CardCtn content={CourseCard_list} />
                    <BasketLabel />
                </>
            } />

        </nowChosensCtx.Provider>
    )
}

//--------------------------------------------------------------//
const CardCtn = (props) => {
    return (
        <div className="cardCtn" id="cardCtn">
            {props.content}
        </div>
    )
}

const CourseCard = (props = { courseName: 'Cal I', courseNo: '23101', credits: 5, sects: [1] }) => {
    const { subjects, pending_subjects } = useContext(nowChosensCtx);
    const { mutate: setPendingSubject } = useSetPendingSubject();
    const [sec, setSec] = useState(props.sects[0])
    // const nowChosens = useContext(nowChosensCtx).get;
    // const setNowChosens = useContext(nowChosensCtx).set;
    const choosen = pending_subjects.find(x => x.subject.id == props.courseNo)

    const whenChosen = () => {
        const out_sub =
            pending_subjects.map(x => ({ subject_id: x.subject.id, number: x.number, year: 2021 }));
        if (!choosen) {
            out_sub.push({
                subject_id: props.courseNo,
                number: sec,
                year: 2021
            })
            setPendingSubject(out_sub);
        }
        else {

            out_sub.splice(pending_subjects.indexOf(props), 1); //deletew 1 items at the index
            console.log(out_sub);
            setPendingSubject(out_sub);
        }
    }

    const sortedSec = useMemo(() => [...props.sects].sort(), [props.sects])

    const handleSecChange = (ev) => {
        setSec(ev.target.value)
    }

    return (
        <div className="card">
            <div style={{ flexGrow: 3 }}>
                <p>{props.courseName} {props.courseNo}</p>
            </div>
            <div style={{ flexGrow: 3 }}>
                <p>{props.credits} หน่วยกิต</p>
            </div>
            <div style={{ flexGrow: 6 }}>
                <label htmlFor="sectSelect">ตอนเรียน : </label>
                <select name="section" id="sectSelect" value={sec} onChange={handleSecChange}>
                    {sortedSec.map((sect) => <option key={sect} value={sect}>{sect}</option>)}
                </select>
            </div>
            <div style={{ flexGrow: 1 }}>
                <button className="btn1" onClick={whenChosen}>
                    {choosen ? 'เลือกแล้ว' : 'เลือก'}
                </button>
            </div>
        </div>
    )
}

const BasketLabel = (props) => {
    const { data: pending_subjects } = usePendingSubject();

    return (
        <div className="basKetDiv">
            <p id="totalchosen">เลือกแล้วจำนวน {pending_subjects?.length ?? 0} วิชา</p>
            <ConfirmLink to='/Subject/RegistConfirm'><button id="buttonchosen" >วิชาที่เลือก</button></ConfirmLink>
        </div>
    )
}

//-----------------------------------------------------------------//


export default Registration