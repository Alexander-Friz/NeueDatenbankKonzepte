const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category',default:'none' }]
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
