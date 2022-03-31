const express = require('express');
const User = require("../models/User");

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({'message': 'Hello World'})
})

//Create a User
router.post('/createUser', async (req, res) => {
    let success = false
    try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({success, error: 'User already exists'})
        }

        await User.create({
            name: req.body.name,
            email: req.body.email,
        })
        success = true
        return res.status(200).json({success, 'message': 'User Added Successfully'})

    }catch(error){
        return res.status(500).json({success, error: 'Internal Server Error'})
    }
})

//Get a User
router.get('/getUser/:id', async (req, res) => {
    let success = false
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({success, error: 'User not found'})
        }
        success = true
        return res.status(200).json({success, user})
    }catch(error){
        return res.status(500).json({success, error: 'Internal Server Error'})
    }
})


//Update a User
router.put('/updateUser/:id', async (req, res) => {
    let success = false
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({success, error: 'User not found'})
        }
        const newUser = {
            email: req.body.email,
            name: req.body.name
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: newUser}, {new: true})
        success = true
        return res.status(200).json({success, updatedUser})
    }catch(error){
        return res.status(500).json({success, error: 'Internal Server Error'})
    }
})


//Delete a User
router.delete('/deleteUser/:id', async (req, res) => {
    let success = false
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({success, error: "User not found"})
        }
        await User.findByIdAndDelete(req.params.id)
        success = true
        return res.status(200).json({success, 'message': 'User Deleted Successfully'})
    }catch(error){
        return res.status(500).json({success, error: 'Internal Server Error'})
    }
})

//Get All Users
router.get('/getAllUsers/:pageSize/:pageNo', async (req, res) => {
    let success = false
    try{
        const users = await User.find()
        if(!users){
            return res.status(400).json({success, error: 'No User found'})
        }
        let pS = req.params.pageSize
        let pN = req.params.pageNo
        const result = users.slice((pN-1)*pS, pN*pS)
        success = true
        const totalUsers = users.length;
        return res.status(200).json({success, totalUsers, result})
    }catch(error){
        return res.status(500).json({success, error: 'Internal Server Error'})
    }
})


module.exports = router