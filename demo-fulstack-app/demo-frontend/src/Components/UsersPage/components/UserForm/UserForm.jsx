import { useEffect, useState } from 'react'
import UserController from '../../../../Api/controllers/user.controller'
import CloseButton from '../../../_common/CloseButton/CloseButton'
import style from './UserForm.module.css'


export default function UserForm({type, closeForm, afterSubmit, selectedUserId}) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")


    useEffect(() => {
        if(selectedUserId && type === 'update') getUser(selectedUserId)
    },[])


    const handleCreate = async () => {
        
        const res = await UserController.create(
            firstName,
            lastName,
            age
        );

        if(res.status !== 200) return alert(res.message)
        closeForm()
        afterSubmit()
    }


    const handleUpdate = async () => {
        if(!selectedUserId) return;

        const res = await UserController.update(
            selectedUserId,
            firstName,
            lastName,
            age,
        )

        if(res.status !== 200) return alert(res.message)
        alert(res.message)
        closeForm()
        afterSubmit()
    }
    

    const getUser = async (userId) => {

        if(!userId) return;

        const res = await UserController.getOne(userId)
        if(res.status !== 200) return alert(res.message)
        
        setFirstName(res.data.user.firstName)
        setLastName(res.data.user.lastName)
        setAge(res.data.user.age)
    }


    return (
        <div className={style.container}>

            <CloseButton onClick={closeForm} />  

            <div className={style.title}>
                {type === 'create' ? "Tworzenie użytkownika" : "Edycja użytkownika"}
            </div>

            <input 
                type="text"
                value={firstName}
                onChange={value => setFirstName(value.target.value)}
                placeholder="imię"
            />

            <input 
                type="text"
                value={lastName}
                onChange={value => setLastName(value.target.value)}
                placeholder="nazwisko"
            />

            <input 
                type="number"
                value={age}
                onChange={value => setAge(value.target.value)}
                placeholder="wiek"
            />

            <div 
                onClick={type === 'create' ? handleCreate : handleUpdate}
                className={style.submitButton}
            >
                {type === 'create' ? 'Utwórz' : "Zapisz zmiany"}
            </div>

        </div>
    )
}