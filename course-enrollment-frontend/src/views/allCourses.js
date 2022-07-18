import React from "react";
import CourseTable from "../components/courseTable";
import { CourseService } from "../services/courseService";
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE_NAME } from "../constants";
import CourseAlert from "../components/CourseAlert";

export default class allCourses extends React.Component {
    state = {
        courses: [],
        alertOpen: false,
        alertMessage: '',
        alertSeverity: 'info',
    }

    componentDidMount() {
        CourseService.getAllCourses().then(res => {
            this.setState({
                courses: res.data
            })
        }).catch(e => {
            console.log(e);
        })
    }

    enrollCourse = (courseName) => {
        //enroll course API: access token + course name
        const accessToken = cookie.load(JWT_TOKEN_COOKIE_NAME)
        CourseService.enrollCourse(accessToken, courseName)
            .then((response) => {
                // alert(`Successfully enrolled course - ${courseName}`);
                this.setState({
                    alertOpen: true,
                    alertMessage: `Successfully enrolled course - ${courseName}`,
                    alertSeverity: 'success',
                });
            })
            .catch((error) => {
                // alert(`Failed to enroll course - ${error.response.data.detail}`);
                this.setState({
                    alertOpen: true,
                    alertMessage: `Failed to enroll course - ${courseName} - ${error.response.data.detail}`,
                    alertSeverity: 'error',
                });
            });

    }

    closeAlert = () => {
        this.setState({
            alertOpen: false,
        });
    }



    render() {
        return <div>
            <>
                <CourseTable courses={this.state.courses} actionLabel="Enroll" onActionClickHandler={this.enrollCourse} />
                <CourseAlert
                    alertOpen={this.state.alertOpen}
                    alertMessage={this.state.alertMessage}
                    alertSeverity={this.state.alertSeverity}
                    closeAlert={this.closeAlert}
                />
            </>
        </div>
    }
}