import React, { createContext, useContext, useMemo, useState } from "react"
import "../App.css";
import "./Registration.css";
import { Link } from 'react-router-dom'
import SubMenu from "./SubMenu";
import ContentBox from "./ContentBox";
import styled from 'styled-components';
import { useListSubjects, usePendingSubject, useRegisteredSubject, useSetPendingSubject } from "../hooks";

const ConfirmLink = styled(Link)`
margin-top:auto;
margin-bottom:auto;
`
/*
var q = (id) => document.getElementById(id)

var Now = {
    chosens: [],
    searched: ''
};
*/
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
    const { data: subjects } = useListSubjects();
    const { data: pending_subjects } = usePendingSubject();
    const { data: registed_subjects } = useRegisteredSubject();

    if (subjects === undefined || pending_subjects === undefined || registed_subjects === undefined) { return null; }

    var CourseCard_list = subjects.map((course) =>
        <CourseCard key={course.id} courseName={course.name_english} courseNo={course.id} credits={course.credit} sects={course.sections} />);

    return (
        <nowChosensCtx.Provider value={{ subjects, pending_subjects, registed_subjects }}>
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
    const { subjects, pending_subjects, registed_subjects } = useContext(nowChosensCtx);
    const { mutate: setPendingSubject } = useSetPendingSubject();
    const [sec, setSec] = useState(props.sects[0])
    const isRegistered = useMemo(() => {
        return registed_subjects.find(x => x.subject_id === props.courseNo) !== undefined;
    },
        [registed_subjects]
    )

    const choosen = useMemo(() =>
        pending_subjects.find(x => x.subject.id === props.courseNo),
        [pending_subjects]
    )

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
            const out_sub2 = out_sub.filter(x => x.subject_id !== props.courseNo)
            console.log(out_sub2);
            setPendingSubject(out_sub2);
        }
    }

    const sortedSec = useMemo(() => [...props.sects].sort(), [props.sects])

    const handleSecChange = (ev) => {
        setSec(ev.target.value)
    }

    var cardColor = isRegistered ? "#f5fff8" : choosen ? '#fff5f8' : '#ffffff'
    var cardTransform = choosen ? 'scale(1.02) translate(10px, 0)' : 'scale(1) translate(0, 0)'

    return (
        <div className="card" style={{ backgroundColor: cardColor, transform: cardTransform }}>
            <div style={{ width: '25%' }}>
                <p>{props.courseName} {props.courseNo}</p>
            </div>
            <div style={{ width: '15%', color: "#898989" }}>
                <p>[{props.credits} หน่วยกิต]</p>
            </div>
            <div style={{ width: '45%' }}>
                <label htmlFor="sectSelect">ตอนเรียน : &nbsp;</label>
                <form className="fix-sect">
                    <select name="section" id="sectSelect" className="sectSelect" onChange={setSec} disabled={isRegistered || choosen}>
                        {sortedSec.map((sect) => <option value={sect}>{sect}</option>)}
                    </select>
                </form>
            </div>
            <div style={{ width: '15%' }}>
                <button className="btn1" onClick={whenChosen} disabled={isRegistered}>
                    {isRegistered ? 'ลงแล้ว' : choosen ? 'เลือกแล้ว' : 'เลือก'}
                </button>
            </div>
        </div>
    )
    /*
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
                    <button className="btn1" onClick={whenChosen} disabled={isRegistered}>
                        {isRegistered ? 'ลงแล้ว' : choosen ? 'เลือกแล้ว' : 'เลือก'}
                    </button>
                </div>
            </div>
        )*/
}

const BasketLabel = () => {
    const { data: pending_subjects } = usePendingSubject();

    return (
        <div className="basKetDiv">
            <p>เลือกแล้วจำนวน {pending_subjects?.length ?? 0} วิชา</p>
            {pending_subjects.length > 0 &&
                <ConfirmLink to='/Subject/RegistConfirm'><button id="buttonchosen" className="finishBtn" >วิชาที่เลือก {'>'}</button></ConfirmLink>
            }
        </div >
    )
}

//-----------------------------------------------------------------//


export default Registration