import axios from "../axios"


export const CourseService = {
    getAllCourses: function () {
        //call API: http method(get) URL:
        return axios.get('courses');
    },
    getEnrolledCourses: function (accessToken) {
        return axios.get('user/courses', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    },
    enrollCourse: (accessToken, courseName) => {
        // POST /user/course/OOD + auth_headers
        return axios.post(`user/course/${courseName}/`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    },
    withdrawCourse: (accessToken, courseName) => {
        // DELETE /user/course/OOD + auth_headers
        return axios.delete(`user/course/${courseName}/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }
}