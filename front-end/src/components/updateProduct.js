import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const User = JSON.parse(localStorage.getItem("user"))
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        let result = await axios.get(`http://localhost:5000/product/${params.id}`)
        if (result.data) {
            let res = result.data
            setName(res.name)
            setPrice(res.price)
            setCategory(res.category)
            setCompany(res.company)
        }
    }

    const handleUpdateProduct = async () => {
        console.log(name)
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }

        let userId = User._id
        let obj = { name, price, category, company, userId }
        console.log('obj', obj)
        const res = await axios.put(`http://localhost:5000/product/${params.id}`, obj)
        console.log('res', res.data)
        if (res.status == 200) {
            setName("")
            setPrice("")
            setCategory("")
            setCompany("")
            navigate("/")
        }

    }

    return (
        <div className='product'>
            <div>
                <h2>Update Product</h2>
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {
                    error && !name && <span className='invalid-input'>Enter Valid Name</span>
                }

                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {
                    error && !price && <span className='invalid-input'>Enter Valid Product Price</span>
                }
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Product Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {
                    error && !category && <span className='invalid-input'>Enter Valid Product Category</span>
                }
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Product Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                {
                    error && !company && <span className='invalid-input'>Enter Product Company</span>
                }
                <button
                    className="add-btn"
                    type="button"
                    onClick={() => handleUpdateProduct()}
                >
                    Update Product
                </button>
            </div>
        </div>
    )
}

export default UpdateProduct