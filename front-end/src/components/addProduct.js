import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const User = JSON.parse(localStorage.getItem("user"))

    const handleAddProduct = async () => {
        console.log(name)
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }

        let userId = User._id
        let obj = { name, price, category, company, userId }
        console.log('obj', obj)
        const res = await axios.post("http://localhost:5000/add-product", obj)
        if (res.status == 200) {
            setName("")
            setPrice("")
            setCategory("")
            setCompany("")
        }

    }

    return (
        <div className='product'>
            <div>
                <h2>Add Product</h2>
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
                    onClick={() => handleAddProduct()}
                >
                    Add Product
                </button>
            </div>
        </div>
    )
}

export default AddProduct