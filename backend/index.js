const express = require('express')
require("./db/config")
const cors = require('cors')
const User = require('./db/user')
const app = express()


app.use(express.json())
app.use(cors())

app.post("/signup", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    res.send(result)
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")  // select("-password") toremove password
        if (user) {
            res.send(user)
        } else {
            res.send({ result: "No User Found" })
        }
    } else {
        res.send({ result: "user or password missing" })
    }


})

app.get("/", (req, res) => {
    res.send('app working')
})

app.listen(5000)