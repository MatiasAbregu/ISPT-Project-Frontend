import '../../styles/pages/schoolYear/SectionStudentsModal.css';
import Select from 'react-select'
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserProvider';

export const SectionStudentsModal = ({ setModal }) => {



    const { user } = useContext(UserContext);

    const onSubmit = async (data) => {

    }


    
    useEffect(() => {

    }, []);

    return (
        <div>
            <h1>Section Students Modal</h1>
            
        </div>
    )
}