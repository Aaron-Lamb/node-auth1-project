const express = require('express');
const bcrypt = require('bcryptjs');
const { unauthorized } = require('./user-middleware');
const Users = require('./user-model');

const router = express.Router();

router.get('/users', unauthorized(), async (req, res, next) => {
    try{
        return res.status(200).json(await Users.getUsers())
    } catch(error){
        next(error)
    }
})

router.post('/register', async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await Users.getUserBy({ username }).first();
        if(user){
            return res.status(409).json({
                errorMessage: "This username is taken"
            })
        }
        const newUser = await Users.addUser({
            username,
            password: await bcrypt.hash(password, 13)
        })
        res.status(201).json(newUser);
    } catch(error){
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try{
        const { username, password } = req.body
        const user = await Users.getUserBy({ username }).first()

        if(!user){
            return res.status(401).json({
                errorMessage: "Invalid credentials"
            })
        }

        const passwordValidate = await bcrypt.compare(password, user.password)

        if(!passwordValidate) {
            return res.status(401).json({
                errorMessage: "The password is invalid"
            })
        }

        req.session.user = user;

        return res.status(200).json({
            welcomeMessage: `Welcome ${user.username}`
        })

    } catch(error){
        next(error)
    }
})

router.get('/logout', async (req, res, next) => {
    try{
        req.session.destroy((error) => {
            if(error) {
                next(error)
            } else {
                return res.status(204).end()
            }
        })
    } catch(error){
        next(error)
    }
})

module.exports = router;