import React from "react";
import CourseTable from "../components/courseTable";
import { useEffect, useState } from "react";
import { CourseService } from "../services/courseService";
import cookie from "react-cookies";
import { JWT_TOKEN_COOKIE_NAME } from '../constants'
import CourseAlert from "../components/CourseAlert";
// export default class enrolledCourses extends React.Component {
//     render() {
//         return <h2>Enrolled Courses</h2>;
//     }
// }

function EnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    //react hooks life cycle
    useEffect(function () {
        getEnrolledCourses();
    }, []);


    const getEnrolledCourses = () => {
        //call api to fetech enrolled courses
        //1. success - setEnrolledCourses
        //2. failuer - display error message
        const token = cookie.load(JWT_TOKEN_COOKIE_NAME);
        if (token) {
            CourseService.getEnrolledCourses(token)
                .then((response) => {
                    setEnrolledCourses(response.data)
                })
                .catch((error) => {
                    alert(error.response.data.detail)
                });
        } else {
            window.location.href = '/';
        }
    }

    const withdrawCourse = (courseName) => {
        //call API user/course/OOD
        const accessToken = cookie.load(JWT_TOKEN_COOKIE_NAME)
        CourseService.withdrawCourse(accessToken, courseName).then(
            function (response) {
                getEnrolledCourses();
                // alert(`Successfully withdrawn course - ${courseName}`)
                setAlertOpen(true)
                setAlertMessage(`Successfully withdrew course - ${courseName}`)
                setAlertSeverity('success')
            }
        ).catch(function (error) {
            // alert(`Failed to withdraw course - ${error.response.data.detail}`)
            setAlertOpen(true)
            setAlertMessage(`Failed to withdraw course - ${error.response.data.detail}`)
            setAlertSeverity('error')

        });
    }

    return (
        <>
            <CourseTable courses={enrolledCourses} actionLabel="Withdraw" onActionClickHandler={withdrawCourse} />
            <CourseAlert
                alertOpen={alertOpen}
                alertMessage={alertMessage}
                alertSeverity={alertSeverity}
                closeAlert={() => {
                    setAlertOpen(false)
                }}
            />
        </>)
}

export default EnrolledCourses