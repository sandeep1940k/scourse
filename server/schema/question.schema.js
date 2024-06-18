const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    format: { type: String, required: true }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId},
}, {
    timestamps: true 
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
