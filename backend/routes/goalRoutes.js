const express = require('express');
const router = express.Router();
const { getGoals, setGoal, putGoal, deleteGoal } = require('../controllers/goal.Controller');
const {protect} = require('../middleware/auth.middleware')

router.get('/',protect, getGoals)
router.post('/',protect, setGoal)
router.put('/:id',protect, putGoal)
router.delete('/:id',protect, deleteGoal)

module.exports = router;