const database = require('../data/config');

function getUsers() {
    return database("users").select("id", "username");
}

function getUserBy(filter) {
    return database("users")
        .select("id", "username", "password")
        .where(filter);
}

async function addUser(user) {
    const [id] = await database("users").insert(user);
    return getUserById(id);
}

function getUserById(id) {
    return database("users")
        .select('id', 'username')
        .where('id', id)
        .first();
}

module.exports = {
    getUsers,
    addUser,
    getUserBy,
    getUserById
}