const questionDao = require('../dao/question.dao');
const { RESPONSE } = require('../constant/response.constant');
const { MESSAGE } = require('../constant/message.constant');

const saveQuestion = async (req, res) => {
    try {
        const { name, category, format } = req.body;
        const { userId } = req.params;

        if (!name || !category || !format) {
            return res.status(RESPONSE.BAD_REQUEST).send({ message: MESSAGE.MISSING_REQUIRED_FIELDS });
        }
        let data = {
            ...req.body,
            createdBy: userId,
        }
        const create = await questionDao.create(data);
        res.status(RESPONSE.OK).send({ question: create, message: MESSAGE.ACCOUNT_CREATE_SUCCESSFULLY });
    } catch (error) {
        console.error(error);
        res.status(RESPONSE.INTERNAL_SERVER_ERROR).send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
};
const getQuestion = async (req, res) => {
    try {
        const { userId } = req.params;
        const questions = await questionDao.find({ createdBy: userId });
        res.status(RESPONSE.OK).send({ questions });
    } catch (error) {
        console.error(error);
        res.status(RESPONSE.INTERNAL_SERVER_ERROR).send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
};

module.exports = {
    saveQuestion,
    getQuestion,
};
