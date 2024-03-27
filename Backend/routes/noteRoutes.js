const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post('/create', noteController.createNote);
router.get('/user/:userId', noteController.getNotesByUser);
router.put('/:noteId',noteController.updateNoteById);
router.delete('/:noteId', noteController.deleteNoteById);



module.exports = router;
