use xando

// Create User
db.createUser({
    user: "xando-db-user",
    pwd: "xando-db-pwd",
    roles: [
        "readWrite",
    ],
})

// Create Collections
db.createCollection("game")
db.createCollection("player")