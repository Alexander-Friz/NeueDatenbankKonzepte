const User = require('../models/user');
const bcrypt = require('bcrypt');

const Note = require('../models/note'); 
const Category = require('../models/category');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json('User created successfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Nutzer nicht gefunden.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Ungültige Anmeldedaten.' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '30m' }); 
    res.cookie('token', token, { httpOnly: true, maxAge: 1800000 });
    res.status(200).json({ message: 'Erfolgreich angemeldet.', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    let { email, password } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }
  
    const updatedUser = await User.findByIdAndUpdate(userId, { email, password }, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).send('Nutzer nicht gefunden.');
    }
    res.status(200).send('Nutzer erfolgreich aktualisiert.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await Note.deleteMany({ userId: userId });

    await Category.deleteMany({ userId: userId });

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send('Nutzer nicht gefunden.');
    }

    res.status(200).send('Nutzer und alle zugehörigen Daten erfolgreich gelöscht.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};