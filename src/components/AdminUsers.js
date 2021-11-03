import React from 'react'

const AdminUsers = ({allUsers, toggleAdminStatus}) => {


    
    return (
        <div>
            {
                allUsers.map(user => (
                    <div key={user.id}>
                        <h1>User Name: {user.username}</h1>
                        <h3>Id: {user.id}</h3>
                        <h3>Email Address: {user.emailAddress}</h3>
                        { user.isAdmin ? (
                        <>
                        <h3>Type: Admin</h3>
                        </>
                        ) : (
                        <>
                        <h3>Type: User</h3>
                        <button onClick = {()=>toggleAdminStatus(user.id)}>Add Admin Status</button>
                        </>
                        )
                        }
                    </div>

                ))
            }
        </div>
    )
}

export default AdminUsers

