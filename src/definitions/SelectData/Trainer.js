import { useState, useEffect } from 'react';
import { GetAllTrainers } from 'src/api/catalog/TrainerAPI';

const useTrainerData = () => {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        GetAllTrainers()
            .then((response) => {
                setTrainers(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return trainers;
};

export default useTrainerData;