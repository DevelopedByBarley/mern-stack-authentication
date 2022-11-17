const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalSchema')

//  @desc Get Goals
//  @route GET /api/goals
//  @access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals)
})


//  @desc Set Goals
//  @route POST /api/goals
//  @access Private

const setGoal = asyncHandler(async (req, res) => {
  const { text } = req.body
  if (!text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: text
  })

  res.status(200).json(goal)
})

//  @desc Update Goals
//  @route PUT /api/goals/:id
//  @access Private

const putGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const goal = await Goal.findById(id)


  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, { text: text }, { new: true })

  res.status(200).json(updateGoal)
})

//  @desc Delete Goals
//  @route GET /api/goals/:id
//  @access Private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found');
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getGoals,
  setGoal,
  putGoal,
  deleteGoal
}