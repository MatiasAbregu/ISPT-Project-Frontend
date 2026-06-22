import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/modals/ObservationModal.css'
import PersonService from '../../services/people/PersonService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ObservationYUP from '../../schemas/person-schemas/ObservationYUP';
import { UserContext } from '../../context/UserProvider';
import toast from 'react-hot-toast';

export const ObservationModal = ({ setModal, sendTo, requestId }) => {

  const [showEdit, setShowEdit] = useState(false);
  const { user } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(ObservationYUP),
    shouldUnregister: false
  });

  useEffect(() => {
    getObservation(requestId);
  }, [])

  const getObservation = async (id) => {
    try {
      if (sendTo == "person") {
        const res = await PersonService.getObservationByPersonId(id);

        if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
          const data = res.data.object;
          reset({
            personId: data.personId,
            observation: data.observation
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const backendResponse = error.response.data;
        toast.error(backendResponse.message);
      } else {
        toast.error("No se pudo conectar con el servidor.");
      }
    }
  }

  const updateObservation = async (data) => {
    try {
      let finalData;
      finalData = {
        ...data,
        updatedById: user.id || user.ID,
      }
      const res = await PersonService.updateObservation(finalData);

      if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
        toast.success(res.data.object);

        setShowEdit(false);
        await getObservation(requestId);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const backendResponse = error.response.data;
        toast.error(backendResponse.message);
      } else {
        toast.error("No se pudo conectar con el servidor.");
      }
    }
  }

  return (
    <article className="observationModal">
      <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Observaciones</h4>
      <div className="observationFormContainer">
        <form onSubmit={handleSubmit(updateObservation, e => console.log(e))}>
          <InputControl type={"textarea"} icon={"visibility"} register={register} data={"observation"} readonly={!showEdit}
            error={errors.observation}>Observaciones</InputControl>
          <div className='buttonContainer'>
            <span class="material-symbols-outlined edit" onClick={() => setShowEdit(prev => !prev)}>edit</span>
            {
              showEdit ?
                <button type="submit" className="add-button">
                  <span className="material-symbols-outlined">save</span> Guardar cambios
                </button> : <></>
            }
          </div>
        </form>
      </div>
    </article >
  )
}