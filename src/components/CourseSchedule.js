import { useRegisteredSubject } from "../hooks";
import ContentBox from "./ContentBox";
import { CourseRow, TableCtn } from "./RegistConfirm";

const CourseSchedule = () => {

    const { data: courses, isLoading } = useRegisteredSubject();
    if (isLoading) {
        return null;
    }

    const CourseRow_list =
        courses.map((courseData, index) => <CourseRow key={courseData.subject.id} courseData={courseData} index={index + 1} noDelete={true} />);

    return <>
        <div className="heading">ตารางสอน</div>
        <ContentBox title="ตารางสอน" content={
            <>
                <TableCtn content={CourseRow_list} noDelete={true} />

            </>
        } />
    </>
}

export default CourseSchedule;