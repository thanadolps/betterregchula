import { useLearnSchedule, useRegisteredSubject } from "../hooks";
import ContentBox from "./ContentBox";

const CourseSchedule = () => {

    const { data: schedule, isLoading } = useLearnSchedule();
    if (isLoading) {
        return null;
    }

    return <>
        <div className="heading">ตารางสอน</div>
        <ContentBox title="ตารางสอน" content={
            <>
                <code style={{ whiteSpace: "break-spaces" }}>
                    {JSON.stringify(schedule, null, 1)}
                </code>
                <TimeTable schedule={schedule} />
            </>
        } />
    </>
}

const TimeTable = (props) => {
    return <div>
    </div>
}

export default CourseSchedule;