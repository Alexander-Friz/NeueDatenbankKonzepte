const Category = require('../models/category');

exports.createCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const category = new Category({
      name,
      userId
    });
    await category.save();
    res.status(201).send('Category created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};



exports.getCategoriesByUser = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const categories = await Category.find({ userId: userId });
    if (categories.length === 0) {
      return res.status(404).send('Keine Kategorien für diesen Nutzer gefunden.');
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name } = req.body; 
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: name },
      { new: true } 
    );

    if (!updatedCategory) {
      return res.status(404).send('Kategorie nicht gefunden.');
    }

    res.status(200).send('Kategorie erfolgreich aktualisiert.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};



exports.deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).send('Kategorie nicht gefunden.');
    }
    res.status(200).send('Kategorie erfolgreich gelöscht.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

