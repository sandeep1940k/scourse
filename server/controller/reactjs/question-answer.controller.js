const questionAnswerDao = require('../../dao/reactjs/question-answer.dao');
const { RESPONSE } = require('../../constant/response.constant');
const { MESSAGE } = require('../../constant/message.constant');

const saveQuestionAnswer = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const { userId } = req.params;

        if (!question || !answer) {
            return res.status(RESPONSE.BAD_REQUEST).send({ message: MESSAGE.MISSING_REQUIRED_FIELDS });
        }
        let data = {
            ...req.body,
            createdBy: userId,
        }
        const create = await questionAnswerDao.create(data);
        res.status(RESPONSE.OK).send({ question: create, message: MESSAGE.SAVE_SUCCESSFULLY });
    } catch (error) {
        console.error(error);
        res.status(RESPONSE.INTERNAL_SERVER_ERROR).send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
};
const getQuestionAnswer = async (req, res) => {
    try {
        const questions = await questionAnswerDao.find({});
        res.status(RESPONSE.OK).send({ questions });
    } catch (error) {
        console.error(error);
        res.status(RESPONSE.INTERNAL_SERVER_ERROR).send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
};
const deleteQuestionAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        await questionAnswerDao.deleteOne({_id: id});
        res.status(RESPONSE.OK).send({ message: MESSAGE.DELETE_SUCCESSFULLY });
    } catch (error) {
        console.error(error);
        res.status(RESPONSE.INTERNAL_SERVER_ERROR).send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
};


module.exports = {
    saveQuestionAnswer,
    getQuestionAnswer,
    deleteQuestionAnswer,
};
