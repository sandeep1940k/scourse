const UserModel = require('../schema/user.schema')


const create = async (body) => {
    return await UserModel.create(body);
}
const exists = async (body) => {
    return await UserModel.exists(body);
}


module.exports = {
    create,
    exists,
}