const express = require('express')
require("./db/config")
const User = require('./db/user')
const app = express()


app.use(express.json())

app.post("/signup", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    res.send(result)
})

app.get("/", (req, res) => {
    res.send('app working')
})

app.listen(5000)