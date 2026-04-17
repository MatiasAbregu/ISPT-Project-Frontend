import * as Yup from 'yup';
import PersonYUP from './PersonYUP';

const TeacherYUP = PersonYUP.concat(
    Yup.object({
   
    })
);

export default TeacherYUP;