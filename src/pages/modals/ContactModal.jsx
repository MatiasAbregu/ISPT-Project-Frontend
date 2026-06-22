import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/modals/ContactModal.css'
import { UserContext } from '../../context/UserProvider';
import ContactYUP from '../../schemas/person-schemas/ContactYUP';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonService from '../../services/people/PersonService';
import toast from 'react-hot-toast'

export const ContactModal = ({ setModal, personId }) => {

  const [showEdit, setShowEdit] = useState(false);
  const [contactId, setContactId] = useState();
  const { user } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(ContactYUP),
    shouldUnregister: false
  });

  useEffect(() => {
    if (personId != 0) getContact(personId);
  }, [personId]);

  const getContact = async (id) => {
    try {
      const res = await PersonService.getContactByPersonId(id);

      if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
        const data = res.data.object;

        setContactId(data.contactId);

        reset({
          phoneNumber: data.phoneNumber,
          email: data.email,
          emergencyNumber: data.emergencyNumber,
          contactNameEmergency: data.contactNameEmergency
        });
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

  const updateContact = async (data) => {
    try {
      let finalData;
      finalData = {
        ...data,
        updatedById: user.id || user.ID,
        contactId: contactId
      }
      const res = await PersonService.updateContact(finalData);

      if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
        toast.success(res.data.object);

        setShowEdit(false);
        await getContact(personId);
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
    <article className="contactModal">
      <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Contacto</h4>
      <div className="contactFormContainer">
        <form onSubmit={handleSubmit(updateContact, e => console.log(e))}>
          <InputControl type={"email"} icon={"email"} register={register} data={"email"} readonly={!showEdit} error={errors.email}>
            Correo electrónico de la persona
          </InputControl>
          <InputControl type={"tel"} icon={"phone"} register={register} data={"phoneNumber"} readonly={!showEdit}
            error={errors.phoneNumber}>
            Número de celular de la persona
          </InputControl>
          <InputControl type={"tel"} icon={"local_hospital"} register={register} data={"emergencyNumber"} readonly={!showEdit}
            error={errors.emergencyNumber}>
            Número del contacto de emergencia
          </InputControl>
          <InputControl type={"text"} icon={"person"} register={register} data={"contactNameEmergency"} readonly={!showEdit}
            error={errors.contactNameEmergency}>
            Persona asociada al contacto de emergencia
          </InputControl>
          <div className='buttonContainer'>
            {
              user ?
                user.roles.includes("Directivo") || user.roles.includes("Preceptor") ?
                  <span class="material-symbols-outlined edit" onClick={() => setShowEdit(prev => !prev)}>
                    {showEdit ? `cancel` : `edit`}
                  </span>
                  : undefined
                : undefined
            }
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