import React, { useEffect, useMemo, useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistConfirm from "./components/RegistConfirm";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterLogo from "./components/RegisterLogo";
import { render } from "react-dom";
import { components } from 'react'
import Home from "./components/Home"
import Registration from "./components/Registration";
import { useLogin, useLogout, useUserInfo } from "./hooks";
import axios from "axios";
import { BACKEND_URL } from ".";
import RegistrationResult from "./components/RegistrationResult";
import CourseWithdraw from "./components/CourseWithdraw";
import CourseSchedule from "./components/CourseSchedule";
import Building from "./components/Building";

const information = () => <div className="heading"></div>
const ExamSchedule = () => <div className="heading">ตารางสอบ</div>
const Faculty = () => <div className="heading">รหัสคณะ</div>
const document = () => <div className="heading"></div>
const JT19 = () => <div className="heading">จท19</div>
const CR20CR20G = () => <div className="heading">จท20</div>
const CertificateofStudentStatus = () => <div className="heading">หลักฐานรับรองแสดงสถานภาพการเป็นนิสิต</div>
const StudentPersonalRecords = () => <div className="heading">ทะเบียนชื่อ</div>
const Subject = () => <div className="heading"></div>
const EducateResult = () => <div className="heading">ผลการเรียน</div>

function App() {

  const { data: user, isLoading, error2 } = useUserInfo()
  const { mutateAsync: login, error } = useLogin();
  const { mutateAsync: logout } = useLogout();

  const errorMsg = useMemo(() => {
    if (error === null || error === undefined) {
      return "";
    }
    if (error?.response?.status === 404) {
      return "No match!";
    }
    return error?.message || "An Error Occured";
  }, [error])

  if (isLoading) {
    return null;
  }

  const Login = (details) => {
    login(details).catch(err => console.error(err))
  }

  const Logout = () => {
    logout().then(() => global.location.reload()).catch(err => {
      console.error(err);
      global.location.reload();
    })
  }

  return (
    <div className="Appcontainer">
      {(user && !error && !error2) ? (
        <Router>
          <Route path="/Home" component={Home} />
          <Route path="/information" component={information} />
          <Route path="/information/CourseSchedule" component={CourseSchedule} />
          <Route path="/information/ExamSchedule" component={ExamSchedule} />
          <Route path="/information/building" component={Building} />
          <Route path="/information/Faculty" component={Faculty} />
          <Route path="/document" component={document} />
          <Route path="/document/JT19" component={JT19} />
          <Route path="/document/CR20-Cr20G" component={CR20CR20G} />
          <Route path="/document/CertificateofStudentStatus" component={CertificateofStudentStatus} />
          <Route path="/document/StudentPersonalRecords" component={StudentPersonalRecords} />
          <Route path="/Subject" component={Subject} />
          <Route path="/Subject/Registration" component={Registration} />
          <Route path="/Subject/RegistConfirm" component={RegistConfirm} />
          <Route path="/Subject/Course Withdraw" component={CourseWithdraw} />
          <Route path="/Subject/RegistrationResult" component={RegistrationResult} />
          <Route path="/Subject/EducateResult" component={EducateResult} />
          <RegisterLogo />
          <Sidebar Logout={Logout} />

          <div className="bottombg"></div>
        </Router>
      ) : (
        <LoginForm Login={Login} error={errorMsg} />
      )}

    </div>
  );
}


export default App;