import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Icon, Table } from 'semantic-ui-react'

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

    const handleSearch = async (value) => {
        const authToken = JSON.parse(localStorage.getItem('authToken'))
        const headers = { Authorization: `Bearer ${authToken}` }
        // console.log('headers', headers)
        if (value) {
            let result = await axios.get(`http://localhost:5000/search/${value}`, { headers })
            if (result.status == 200) {
                setProducts(result.data)
            }
        } else {
            getProducts()
        }


    }

    return (
        <div className='productlist'>
            <div>
                <div className='heading'>Product List</div>
                <input type='text' placeholder='Search Products' className='search-box' onChange={(e) => handleSearch(e.target.value)} />
                <div className='table'>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>S No.</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className='table'>
                            {
                                products.length > 0 ? products.map((item, index) =>
                                    <Table.Row>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{item.price}</Table.Cell>
                                        <Table.Cell>{item.company}</Table.Cell>
                                        <Table.Cell>{item.category}</Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => handleDeleteItem(item)} className='del-btn'>Delete</button>
                                            <Link to={"/update/" + item._id} >
                                                <button className='update-btn'>Update</button>
                                            </Link>
                                        </Table.Cell>

                                    </Table.Row>
                                )
                                    :
                                    <h2>No Results Found</h2>
                            }

                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ProductList