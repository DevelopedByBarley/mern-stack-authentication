const asyncHandler = require('express-async-handler')


//  @desc Get Goals
//  @route GET /api/goals
//  @access Private

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Set goal' })
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

  res.status(200).json({ message: 'Post goal' })
})

//  @desc Update Goals
//  @route PUT /api/goals/:id
//  @access Private

const putGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` })
})

//  @desc Delete Goals
//  @route GET /api/goals/:id
//  @access Private

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` })
})


module.exports = {
  getGoals,
  setGoal,
  putGoal,
  deleteGoal
}