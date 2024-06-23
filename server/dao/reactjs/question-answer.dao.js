const questionAnswerModal = require('../../schema/reactjs/question-answer.schema')


const create = async (body) => {
    return await questionAnswerModal.create(body);
}
const find = async (body) => {
    return await questionAnswerModal.find(body);
}
const exists = async (body) => {
    return await questionAnswerModal.exists(body);
}
const deleteOne = async (query) => {
    return await questionAnswerModal.deleteOne(query);
}
const findOneAndUpdate = async (conditon, setData ) => {
    return await questionAnswerModal.findOneAndUpdate(conditon, setData);
}


module.exports = {
    create,
    exists,
    find,
    deleteOne,
    findOneAndUpdate,
}