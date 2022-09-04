const BASE_URL = `http://localhost:3002/user`;


const create = async (firstName, lastName, age) => {
    try {
        const response = await fetch(`${BASE_URL}/create`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                firstName,
                lastName,
                age,
            })
        })
        return response.json();
    
    } catch(err) {
        return err;
    }
}


const update = async (userId, firstName, lastName, age) => {
    try {
        const response = await fetch(`${BASE_URL}/update`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                firstName,
                lastName,
                age,
                userId,
            })
        })
        return response.json();
    
    } catch(err) {
        return err;
    }
}


const remove = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/delete?userId=${userId}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',}
        })
        return response.json();
    
    } catch(err) {
        return err;
    }
}


const getAll = async () => {
    try {
        const response = await fetch(`${BASE_URL}/get-all`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        })
        return response.json();
    
    } catch(err) {
        return err;
    }
}


const getOne = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/get-one?userId=${userId}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        })
        return response.json();
    
    } catch(err) {
        return err;
    }
}


const UserController = {
    create,
    update,
    remove,
    getAll,
    getOne,
}

export default UserController;