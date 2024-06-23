const mongoose = require('mongoose');

const questionAnswerSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId},
}, {
    timestamps: true 
});

const Question = mongoose.model('React-Question-Answer', questionAnswerSchema);

module.exports = Question;
