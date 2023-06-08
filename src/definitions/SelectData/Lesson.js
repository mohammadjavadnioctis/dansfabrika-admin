import { useState, useEffect } from 'react';
import { GetAllLessons } from 'src/api/catalog/LessonAPI';

const useLessonData = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        GetAllLessons()
            .then((response) => {
                setLessons(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return lessons;
};

export default useLessonData;