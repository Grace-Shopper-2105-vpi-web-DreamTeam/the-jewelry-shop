import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import diamonds2 from "../imgs/diamonds2.png";

const UserProfile = ({ userOrders, userInfo }) => {
    const columns = [
        { field: "order_item_id", hide: true },
        {
            field: "title",
            headerName: "Item Ordered",
            width: 500
        },
        {
            field: "price",
            headerName: "Unit price",
            width: 500
        },
        {
            field: "quantity",
            headerName: "Ordered quantity",
            width: 500
        }
    ];
    return (
        <div>
            <div>
                {userInfo.user && (
                    <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                        <Paper
                            sx={{
                                position: 'relative',
                                backgroundColor: 'grey.800',
                                color: 'black',
                                mb: 4,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${diamonds2})`,
                            }}
                        >
                            <Typography variant="h2">
                                <br></br>
                                Welcome to Your Account Profile, {userInfo.user.username}
                                <br></br>
                                <br></br>
                            </Typography>
                        </Paper>
                    </Box>

                )}
                <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                    <Paper
                        sx={{
                            position: 'relative',
                            backgroundColor: '#dccdc6',
                            color: 'black',
                            mb: 4,
                        }}
                    >
                        <Typography variant="h5">
                            <br></br>
                            User Information
                        </Typography>
                        <br></br>
                    </Paper>
                </Box>
                {userInfo.user && (
                    <Box style={{ marginLeft: "50px", marginTop: "25px", textAlign: 'center' }}>
                        <Grid container spacing={2} style={{ paddingTop: "10px", paddingBottom: "10px" }} >
                            <Grid item xs={12} sm container justify="center" alignItems="space-between">
                                <Grid item sx container direction="column" spacing={2} >
                                    <Grid item >
                                        <h3>Username: </h3>
                                        <br />
                                        <br />
                                        <p>{userInfo.user.username}</p>
                                        <br />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm container >
                                <Grid item sx container  >
                                    <Grid item xs>
                                        <h3>Email Address:</h3>
                                        <br />
                                        <br />
                                        <p>{userInfo.user.emailAddress}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </div>
            <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                <Paper
                    sx={{
                        position: 'relative',
                        backgroundColor: '#dccdc6',
                        color: 'black',
                        mb: 4,
                    }}
                >
                    <Typography variant="h5">
                        <br></br>
                        Order History
                    </Typography>
                    <br></br>
                </Paper>
            </Box>
            <div style={{ height: '100%', width: "100%" }}>
                {userOrders.length && userOrders.map((singleOrder) => (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 1,
                                m: 1,

                                height: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "nowrap",
                                    p: 1,
                                    m: 1,
                                    bgcolor: "#dccdc6",
                                    justifyContent: "space-evenly"
                                }}
                            >
                                <div>
                                    <h3>Order Id: {singleOrder.id}</h3>
                                </div>
                                <div>
                                    <h3>User Id: {singleOrder.userId}</h3>
                                </div>
                                <div>
                                    <h3>Total: $ {singleOrder.total}</h3>
                                </div>
                            </Box>
                            <Box style={{ height: '30vh', width: "100%", backgroundColor: "#e8d9d4" }}>
                                <h4>Order details </h4>
                                <DataGrid
                                    // MUST KEEP THE TOP THREE PROPS
                                    getRowId={(r) => r.order_item_id}
                                    rows={singleOrder?.order_items}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />

                            </Box>
                        </Box>
                    </>
                ))}
            </div>
        </div>

    );
}

export default UserProfile;
