import { useState, useEffect } from 'react';
import { GetAllStudents } from 'src/api/catalog/StudentAPI';


const useStudentData = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        GetAllStudents()
            .then((response) => {
                setStudents(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return students;
};

export default useStudentData;