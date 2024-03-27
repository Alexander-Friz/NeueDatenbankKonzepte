const Note = require('../models/note');

exports.createNote = async (req, res) => {
  try {
    const { title, content, userId, categories } = req.body;
    const note = new Note({
      title,
      content,
      userId,
      categories
    });
    await note.save();
    res.status(201).json('Note created successfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getNotesByUser = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const notes = await Note.find({ userId: userId });
    if (notes.length === 0) {
      return res.status(404).send('Keine Notizen für diesen Nutzer gefunden.');
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.updateNoteById = async (req, res) => {
  try {
    const noteId = req.params.noteId; 
    const { title, content, categories} = req.body; 
    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content, categories}, { new: true });
    if (!updatedNote) {
      return res.status(404).send('Notiz nicht gefunden.');
    }
    res.status(200).send('Notiz erfolgreich aktualisiert.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.deleteNoteById = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).send('Notiz nicht gefunden.');
    }
    res.status(200).send('Notiz erfolgreich gelöscht.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};