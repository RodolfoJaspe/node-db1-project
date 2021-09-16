const db = require("../../data/db-config")

const getAll = () => {
    return db("accounts")
}

const getById = id => {
    return db("accounts").where({ id }).first()
}

const create = async ({ name, budget }) => {
    name = name.trim()
    const [id] = await db("accounts").insert({ name, budget })
    return getById(id)
}

const updateById = async (id, account) => {
    await db("accounts").where({ id }).update(account)
    return getById(id)
}

const deleteById = async id => {
    await db("accounts").where({ id }).delete()
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}
