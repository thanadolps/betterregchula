import { useDropSubject, useRegisteredSubject } from "../hooks";
import ContentBox from "./ContentBox";
import { CourseRow, TableCtn } from "./RegistConfirm";

const CourseWithdraw = () => {

    const { data: courses, isLoading } = useRegisteredSubject();
    const { mutate: dropSubject } = useDropSubject();

    if (isLoading) {
        return null;
    }

    const CourseRow_list =
        courses.map((courseData, index) => <CourseRow
            key={courseData.subject.id}
            courseData={courseData}
            index={index + 1}
            onDeleteClick={() => {
                const name = prompt(`You are withdrawing "${courseData.subject.name_english}"\nPlease type the subject name to confirm withdraw`).trim()
                if (name != courseData.subject.name_english) {
                    alert("Wrong name")
                    return;
                }
                dropSubject(courseData.subject_id);
            }}
        />);

    return <>
        <div className="heading">ถอนรายวิชา</div>
        <ContentBox title="ถอนรายวิชา" content={
            <>
                <TableCtn content={CourseRow_list} />

            </>
        } />
    </>
}

export default CourseWithdraw;