import { useRegisteredSubject } from "../hooks";
import ContentBox from "./ContentBox";
import { CourseRow, TableCtn } from "./RegistConfirm";

const RegistrationResult = () => {

    const { data: courses, isLoading } = useRegisteredSubject();
    if (isLoading) {
        return null;
    }

    const CourseRow_list =
        courses.map((courseData, index) => <CourseRow courseData={courseData} index={index + 1} noDelete={true} />);

    return <>
        <div className="heading">ผลการลงทะเบียนเรียน</div>
        <ContentBox title="ผลการลงทะเบียนเรียน" content={
            <>
                <TableCtn content={CourseRow_list} noDelete={true} />

            </>
        } />
    </>
}

export default RegistrationResult;