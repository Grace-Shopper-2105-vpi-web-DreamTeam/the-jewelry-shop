import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AdminUsers = ({allUsers, toggleAdminStatus}) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor: "#dccdc6" }}>
            <TableCell><h2>Username</h2></TableCell>
            <TableCell align="right"><h2>User&nbsp;Id</h2></TableCell>
            <TableCell align="right"><h2>Email&nbsp;Address</h2></TableCell>
            <TableCell align="right"><h2>Change&nbsp;Status&nbsp;to&nbsp;Admin</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
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

              {/* <Button onClick={() => history.push(`/editproduct/${product.id}`)}variant="contained" startIcon={<EditIcon />}>
                        Edit
                    </Button> */}
              { !user.isAdmin ?  ( <TableCell align="right"> <Button onClick = {()=>toggleAdminStatus(user.id)}variant="contained" startIcon={<PersonAddIcon />}>
                  Add Admin Status</Button></TableCell>) :null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export default AdminUsers

