const express = require('express')
require("./db/config")
const cors = require('cors')
const User = require('./db/user')
const Product = require('./db/product')
const app = express()

const Jwt = require('jsonwebtoken')
const jwtKey = 'E-comm-Node'
app.use(express.json())
app.use(cors())

app.post("/signup", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    if (result) {
        Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                res.send({ result: "Something went wrong Please login again" })
            } else {
                res.send({ result, authToken: token })
            }

        })
    }
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")  // select("-password") toremove password
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong" })
                } else {
                    res.send({ user, authToken: token })
                }

            })
        } else {
            res.send({ result: "No User Found" })
        }
    } else {
        res.send({ result: "user or password missing" })
    }


})

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})

app.get("/products", async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Products Found" })
    }
})

app.delete("/product/:id", async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No Data Found" })
    }

})

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
            ]
        }
    )
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No Result Found" })
    }

})


async function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    // console.log('middleware called', token)
    if (token) {
        token = token.split(' ')[1]
        // console.log('token', token)
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token with header" })
            } else {
                next()
            }
        })
    } else {
        res.status(403).send({ result: "Please add token with header" })
    }
}

// app.use(verifyToken)   // to apply token auth on all apis

app.listen(5000)