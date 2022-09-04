import { useEffect, useState } from 'react'
import UserController from '../../Api/controllers/user.controller'
import UpContainer from '../_common/UpContainer/UpContainer'
import UserForm from './components/UserForm/UserForm'
import style from './UsersPage.module.css'


export default function UsersPage() {

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedUserId, setSelectedUserId] = useState("")


    useEffect(() => {
        getAllUsers()
    },[])


    const getAllUsers = async () => {
        const res = await UserController.getAll();

        if(res.status !== 200) return alert(res.message)
        setUsers(res.data.users)
    }


    const handleDeleteUser = async (userId) => {

        const confirm = window.confirm("Na pewno chcesz usunąć użytkownika?")

        if(!confirm) return;

        const res = await UserController.remove(userId)

        if(res.status !== 200) return alert(res.message) 
        alert(res.message) 
        getAllUsers()
    }


    return (
        <div className={style.container}>
            
            <div className={style.createButton} onClick={() => setShowCreateForm(true)}>
                Utwórz 
            </div>

            <div className={style.users}>
                {
                    users?.map(user => (
                        <div className={style.user} key={user._id}>

                            <div>
                                {user.firstName} {user.lastName} - wiek - {user.age}
                            </div>

                            <div className={style.deleteUser} onClick={() => handleDeleteUser(user._id)}>
                                Usuń
                            </div>

                            <div className={style.updateUser} onClick={() => {
                                setShowUpdateForm(true)
                                setSelectedUserId(user._id)
                            }}>
                                Aktualizuj
                            </div>

                        </div>
                    ))
                }
            </div>

            {
                showCreateForm && (
                    <UpContainer>
                        <UserForm 
                            closeForm={() => setShowCreateForm(false)} 
                            type="create"
                            afterSubmit={getAllUsers}
                        />
                    </UpContainer>
                )
            }

            {
                showUpdateForm && (
                    <UpContainer>
                        <UserForm 
                            closeForm={() => setShowUpdateForm(false)} 
                            type="update"
                            afterSubmit={getAllUsers}
                            selectedUserId={selectedUserId}
                        />
                    </UpContainer>
                )
            }

        </div>
    )
}