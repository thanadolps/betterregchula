import React from "react"
import App from "../App"
import "../App.css";
import { IoMegaphone } from 'react-icons/io5';
import "./ContentBox.css";

const ContentBox = (props) => {
    return (
        <div className="content1">
            {/*</div><div className="headercontent1">*/}
            <div className="announcementbox1">
                <p id="announcetitle1">{props.title}</p>
            </div>
            {/*</div>*/}
            <div className="contentDiv1">
                {props.content}
            </div>
        </div>

    )
}
export default ContentBox