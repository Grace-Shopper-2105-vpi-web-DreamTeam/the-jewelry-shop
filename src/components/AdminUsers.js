import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AdminUsers = ({allUsers, toggleAdminStatus}) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">User&nbsp;Id</TableCell>
            <TableCell align="right">Email&nbsp;Address</TableCell>
            <TableCell align="right">Change&nbsp;Status&nbsp;to&nbsp;Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.id}</TableCell>
              <TableCell align="right">{user.emailAddress}</TableCell>
              { !user.isAdmin ?  ( <TableCell align="right"> <button onClick = {()=>toggleAdminStatus(user.id)}>Add Admin Status</button></TableCell>) :null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// const AdminUsers = ({allUsers, toggleAdminStatus}) => {


    
//     return (
//         <div>
//             {
//                 allUsers.map(user => (
//                     <div key={user.id}>
//                         <h1>User Name: {user.username}</h1>
//                         <h3>Id: {user.id}</h3>
//                         <h3>Email Address: {user.emailAddress}</h3>
//                         { user.isAdmin ? (
//                         <>
//                         <h3>Type: Admin</h3>
//                         </>
//                         ) : (
//                         <>
//                         <h3>Type: User</h3>
//                         <button onClick = {()=>toggleAdminStatus(user.id)}>Add Admin Status</button>
//                         </>
//                         )
//                         }
//                     </div>

//                 ))
//             }
//         </div>
//     )
// }

export default AdminUsers

