const signupDao = require('../dao/signup.dao');
const { RESPONSE } = require('../constant/response.constant');
const { MESSAGE } = require('../constant/message.constant');

const createAccount = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        if (!username || !password || !email) {
            return res.status(RESPONSE.BAD_REQUEST).send({ message: MESSAGE.MISSING_REQUIRED_FIELDS });
        }
        
        const create = await signupDao.create(req.body);
        res.status(RESPONSE.OK).send({ message: MESSAGE.ACCOUNT_CREATE_SUCCESSFULLY });
    } catch (error) {
        console.error(error);
        res.status(RESPONSE.INTERNAL_SERVER_ERROR).send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.query;
        
        if (!username || !password) {
            return res.status(RESPONSE.BAD_REQUEST).send({ message: MESSAGE.MISSING_REQUIRED_FIELDS });
        }
        
        const user = await signupDao.exists({ username, password });
        if (user) {
            res.status(RESPONSE.OK).send({ message: MESSAGE.LOGIN_SUCCESSFULLY });
        } else {
            res.status(RESPONSE.NO_CONTENT).send({ message: MESSAGE.INCORRECT_USERNAME_PASSWORD });
        }
    } catch (error) {
        console.error(error);
        res.status(RESPONSE.INTERNAL_SERVER_ERROR).send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
};

module.exports = {
    createAccount,
    login,
};
