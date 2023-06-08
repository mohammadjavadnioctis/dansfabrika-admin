import { useState, useEffect } from 'react';
import { GetAllDanceLevels } from 'src/api/catalog/Dance-LevelAPI';

const useDanceLevelData = () => {
    const [danceLevels, setDanceLevels] = useState([]);

    useEffect(() => {
        GetAllDanceLevels()
            .then((response) => {
                setDanceLevels(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return danceLevels;
};

export default useDanceLevelData;