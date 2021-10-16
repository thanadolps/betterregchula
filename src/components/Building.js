import { useState } from "react";
import { useBuildings, useRegisteredSubject } from "../hooks";
import ContentBox from "./ContentBox";
import { CourseRow, TableCtn } from "./RegistConfirm";

const Building = () => {

    const [search, setSearch] = useState();
    const { data: _buildings } = useBuildings(search);

    const buildings = _buildings ?? []
    // if (buildings === undefined) { return null; }

    const list =
        buildings.map((build) => <tr>
            <td>{build.code}</td>
            <td>{build.name_english}</td>
            <td>{build.name_thai}</td>
        </tr>);

    const handleChange = (ev) => {
        setSearch(ev.target.value)
    }

    return <>
        <div className="heading">รหัสอาคาร</div>
        <ContentBox title="รหัสอาคาร" content={
            <>
                <div style={{ textAlign: "center", marginTop: "32px", marginBottom: "-16px" }}>
                    <input style={{ border: "1px solid gray" }} value={search} onChange={handleChange}></input>
                    &nbsp;
                    <button style={{ cursor: "pointer" }}>Submit</button>
                </div>
                <div className="cardCtn" id="cardCtn">
                    <table className="table1">
                        <tr>
                            <th>CODE</th>
                            <th>ENG</th>
                            <th>THA</th>
                        </tr>
                        {list}
                    </table>

                </div>
            </>
        } />
    </>
}

export default Building;