const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex');
const database = require('./data/config');

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(session({
    name: "Wookie",
    resave: false,
    secret: process.env.SECRET || "Some secret info",
    saveUninitialized: false,
}))

server.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        errorMessage: "A server error occured"
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})