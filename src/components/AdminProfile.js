import React, { useState, useEffect } from 'react'
import {
    useHistory
} from "react-router-dom"
import {
    getAllUsers,
    getAllOrders
} from "../api"

const AdminProfile = ({admin}) => {
    let history = useHistory();
    const [allUsers, setAllUsers] = useState([])

    useEffect(async () => {
        const response = await getAllUsers(JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
            console.log("AllUsers", response)
            setAllUsers(response)
        }
    }, [])

    // const adminUsers = async () => {
    //     const response = await getAllUsers(JSON.parse(localStorage.getItem('userDetails')))
    //     if (response) {
    //         console.log("AllUsers", response)
    //         setAllUsers(response)
    //     }
    // }
   

    const handleOrdersClick = async () => {

        const response = await getAllOrders(JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
            console.log("AllOrders", response)

        }

    }




    return (
        <>
  {
      allUsers.map(user => (
          <div key = {user.id}>
            <h1>User Name: {user.username}</h1>
            <h3>Id: {user.id}</h3>
            <h3>Email Address: {user.emailAddress}</h3>
            {admin ?
            <h3>Type: Admin</h3> : <h3>Type: User</h3>
            }   
          </div>

      ))
  }
  
           
                   
                

                    
                    
                
        
            {/* {
                < button onClick={handleUsersClick} > All Users</button >
            } */}
            {
                <button onClick={handleOrdersClick}>All Orders</button>
            }
            {
                <button onClick={() => history.push('/adminproducts')}>All Products</button>
            }

        </>
    )

}


export default AdminProfile;