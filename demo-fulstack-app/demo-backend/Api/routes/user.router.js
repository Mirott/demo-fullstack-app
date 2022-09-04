const express = require('express');
const router = express.Router();
const db = require("../../DataBase/DataBase")


const create = async (req, res) => {
    try {

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const age = req.body.age;

        if(!firstName | !lastName | !age) return res.send({ status: 400, message: `Musisz podać wszystkie dane!` })

        const newUser = new db.User({
            firstName: firstName,
            lastName: lastName,
            age: age,
        })

        if(!newUser.save()) return res.send({ status: 400, message: `Nie udało się zapisać użytkownika w bazie.` })

        res.send({ status: 200, message: `Użytkownik został utworzony.` })
        
    } catch (error) {

        console.log(error)
        res.send({ status: 400, message: `Błąd podczas tworzenia użytkownika.` })

    }
}


const update = async (req, res) => {
    try {

        const userId = req.body.userId;

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const age = req.body.age;

        const user = await db.User.findOne({_id: userId})
        if(!user) return res.send({ status: 400, message: `Nie znaleziono użytkownika o podanym id.` })

        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;

        if(!user.save()) return res.send({ status: 400, message: `Nie udało się zapisać zmian.` })

        res.send({ status: 200, message: `Użytkownik został zaktualizowany.` })
        
    } catch (error) {

        console.log(error)
        res.send({ status: 400, message: `Błąd podczas aktualizowania użytkownika.` })

    }
}


const remove = async (req, res) => {
    try {

        const userId = req.query.userId;

        const user = await db.User.findOne({_id: userId})
        if(!user) return res.send({ status: 400, message: `Nie znaleziono użytkownika.` })

        if(!user.delete()) return res.send({ status: 400, message: `Nie udało się usunąć użytkownika z bazy.` })

        res.send({ status: 200, message: `Użytkownik usunięty.` })
        
    } catch (error) {

        console.log(error)
        res.send({ status: 400, message: `Błąd podczas usuwania użytkownika.` })

    }
}


const getAll = async (req, res) => {
    try {

        const users = await db.User.find()

        res.send({
            status: 200,
            message: 'Success',
            data: {
                users: users,
            }
        })
        
    } catch (error) {

        console.log(error)
        res.send({ status: 400, message: `Błąd podczas pobierania użytkowników.` })

    }
}


const getOne = async (req, res) => {
    try {

        const userId = req.query.userId;

        const user = await db.User.findOne({_id: userId});
        if(!user) return res.send({ status: 400, message: `Nie znaleziono użytkownika.` })

        res.send({
            status: 200,
            message: 'Success',
            data: {
                user: user,
            }
        })
        
    } catch (error) {
        
        console.log(error)
        res.send({ status: 400, message: `Błąd podczas pobierania użytkownika.` })

    }
}


router.post("/create", create)

router.put("/update", update)

router.delete("/delete", remove)

router.get("/get-all", getAll)
router.get("/get-one", getOne)

module.exports = router