import React, { useState, useEffect } from 'react'
import {
    useHistory
} from "react-router-dom"
import {
    getAllUsers,
    getAllOrders,
    getAllProducts,
    updateUserAdmin
} from "../api"
import {
    AdminUsers
} from "."

const AdminProfile = ({ admin }) => {
    let history = useHistory();
    const [allUsers, setAllUsers] = useState([])
    const [allOrders, setAllOrders] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [showSection, setShowSection] = useState({ users: false, orders: false, products: false })

    useEffect(() => {
        const getAllData = async () => {
            try {
                const users = await getAllUsers(JSON.parse(localStorage.getItem('userDetails')))
                console.log("AllUsers", users)
                setAllUsers(users)
                const orders = await getAllOrders(JSON.parse(localStorage.getItem('userDetails')))
                console.log("AllOrders", orders)
                setAllOrders(orders)
                const products = await getAllProducts()
                setAllProducts(products)
            } catch (error) {
                console.log(error)
            }
        }
        getAllData();
    }, [])

    const handleClick = async (e) => {
        const type = e.target.id
        console.log("type", type)
        if (type === 'orders') {
            setShowSection({ ...showSection, orders: true, users: false, products: false })
        } else if (type === 'users') {
            setShowSection({ ...showSection, orders: false, users: true, products: false })
        } else {
            setShowSection({ ...showSection, orders: false, users: false, products: true })
        }
    }

    const toggleAdminStatus = async (userId) => {
        const response = await updateUserAdmin(userId,JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
            const users = await getAllUsers(JSON.parse(localStorage.getItem('userDetails')))
            console.log("AllUsers", users)
            setAllUsers(users)
        }
    }






    return (
        <div>
            < button id='users' onClick={handleClick} > All Users</button >
            < button id='orders' onClick={handleClick} > All Orders</button >
            < button id='products' onClick={handleClick} > All Products</button >
            {showSection.users && <AdminUsers 
            allUsers={allUsers} 
            toggleAdminStatus = {toggleAdminStatus}/>}
        </div>










    )

}


export default AdminProfile;