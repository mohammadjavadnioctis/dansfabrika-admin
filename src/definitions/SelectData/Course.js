import { useState, useEffect } from 'react';
import { GetAllCourses } from 'src/api/catalog/CourseAPI';

const useCourseData = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        GetAllCourses()
            .then((response) => {
                setCourses(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return courses;
};

export default useCourseData;