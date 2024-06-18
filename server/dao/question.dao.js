const questionModal = require('../schema/question.schema')


const create = async (body) => {
    return await questionModal.create(body);
}
const find = async (body) => {
    return await questionModal.find(body);
}
const exists = async (body) => {
    return await questionModal.exists(body);
}


module.exports = {
    create,
    exists,
    find,
}