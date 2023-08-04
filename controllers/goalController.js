const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')


const getGoals = asyncHandler (async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

const setGoals = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Agrega campo texto")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

const updateGoal = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error ('Falta Meta')
    }

    if(!req.user){
        res.status(401)
        throw new Error('Usuario No Encontrado')
    }

    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario No Autorizado')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error ('Falta Meta')
    }

    if(!req.user){
        res.status(401)
        throw new Error('Usuario No Encontrado')
    }

    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario No Autorizado')
    }

    await goal.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}