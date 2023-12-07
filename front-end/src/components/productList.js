import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])
    // console.log('products', products)

    const getProducts = async () => {
        let result = await axios.get("http://localhost:5000/products")
        if (result.status === 200) {
            setProducts(result.data)
        }
    }
    const handleDeleteItem = async (item) => {
        const result = await axios.delete(`http://localhost:5000/product/${item._id}`)
        if (result.data.deletedCount == 1) {
            getProducts()
        }
    }

    return (
        <div className='productlist'>
            <h3>Product List</h3>
            <ul>
                <li>S No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Actions</li>
            </ul>
            {
                products.map((item, index) =>
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => handleDeleteItem(item)} className='del-btn'>Delete</button>
                            <Link to={"/update/" + item._id} >
                                <button className='update-btn'>Update</button>
                            </Link>

                        </li>
                    </ul>
                )
            }

        </div>
    )
}

export default ProductList