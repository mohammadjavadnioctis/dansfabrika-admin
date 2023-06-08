import { useState, useEffect } from 'react';
import { GetAllDanceTypes } from 'src/api/catalog/Dance-TypeAPI';


const useDanceTypeData = () => {
    const [danceTypes, setDanceTypes] = useState([]);

    useEffect(() => {
        GetAllDanceTypes()
            .then((response) => {
                setDanceTypes(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return danceTypes;
};

export default useDanceTypeData;