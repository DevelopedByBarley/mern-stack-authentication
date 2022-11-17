const express = require('express');
const { getGoals, setGoal, putGoal, deleteGoal } = require('../controllers/goal.Controller');
const router = express.Router();

router.get('/', getGoals)
router.post('/', setGoal)
router.put('/:id', putGoal)
router.delete('/:id', deleteGoal)

module.exports = router;