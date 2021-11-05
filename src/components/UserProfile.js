import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const UserProfile = ({ userOrders, userInfo }) => {
    return (
        <div>
            {userInfo.user && (
                <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                    <Typography variant="h4">
                        Welcome to Your Account Profile, {userInfo.user.username}
                    </Typography>
                </Box>
            )}

            {userInfo.user && (
                <Box style={{ marginLeft: "50px", marginTop: "25px", textAlign: 'center' }}>
                    <Divider style={{ width: "90vw" }} />
                    <Typography style={{ backgroundColor: "white" }} variant="h6">
                        User Information
                    </Typography>
                    <Divider style={{ width: "90vw" }} />
                    <Divider style={{ width: "90vw" }} />
                    <Grid container spacing={2} style={{ paddingTop: "10px", paddingBottom: "10px" }} >
                        {/* <Grid item>
                         <h3>User Information</h3> 
                     </Grid>  */}
                        <Grid item xs={12} sm container justify="center" alignItems="space-between">
                            <Grid item sx container direction="column" spacing={2} >
                                <Grid item >
                                    <b>Username: </b>
                                    <br />
                                    <br />
                                    <p>{userInfo.user.username}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm container >
                            <Grid item sx container  >
                                <Grid item xs>
                                    <b>Email Address: </b>
                                    <br />
                                    <br />
                                    <p>{userInfo.user.emailAddress}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider style={{ width: "90vw" }} />
                </Box>
            )}

            {userInfo.user && (
                <Box style={{ marginLeft: "50px", marginTop: "25px", textAlign: 'center' }}>
                    <Divider style={{ width: "90vw" }} />
                    <Typography style={{ backgroundColor: "white" }} variant="h6">
                        Order History
                    </Typography>
                    <Divider style={{ width: "90vw" }} />
                    <Divider style={{ width: "90vw" }} />
                    <Grid container spacing={2} style={{ paddingTop: "10px", paddingBottom: "10px" }} >
                       <Grid item xs={12} sm container justify="center" alignItems="space-between">
                            {userOrders.length && userOrders.map(order => {
                                return (
                                    <div>
                                        <Grid style={{ display: "flex", justifyContent: "flex-start" }}
                                            item sm={12} lg={4}>Order #: {order.id}</Grid>
                                        <Grid style={{ display: "flex", justifyContent: "flex-end" }} item sm={12} lg={12}>Order Total =  ${order.total}</Grid>
                                        {order.order_items.map(item => {
                                            return (
                                                <div>
                                                    <Grid style={{ display: "flex", justifyContent: "center" , textAlign: "left"}} item sm={12} lg={8}><b>Item Ordered: </b>{item.title}</Grid>
                                                    <Grid style={{ display: "flex", justifyContent: "center", textAlign: "left" }}item sm={12} lg={8}>Item Quantity: {item.quantity}</Grid>
                                                    <Grid style={{ display: "flex", justifyContent: "center", textAlign: "left" }}item sm={12} lg={8}>Item Price: {item.price}</Grid>

                                                </div>
                                            )
                                        }
                                        )}
                                        {/* <Grid style={{ display: "flex", justifyContent: "flex-end" }} item sm={12} lg={12}>Total =  ${order.total}</Grid> */}

                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <Divider style={{ width: "90vw" }} />
                                        <Divider style={{ width: "90vw" }} />

                                    </div>
                                )
                            })}
                        </Grid>
                    </Grid>



                    {/* <Grid container spacing={2} style={{ paddingTop: "10px", paddingBottom: "10px", direction: "row", backgroundColor: "red" }} >
                        {userOrders.length && userOrders.map(order => {
                            return (
                                <div>
                                    <Grid item xs={12} sm container justify="center" alignItems="space-between">
                                        <Grid item sx container direction="row" spacing={2} >
                                            <Grid item >
                                                <b>Order #: </b>
                                                <br />
                                                <br />
                                                <p> {order.id}</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {order.order_items.map(item => {
                                        return (

                                            <div>
                                              <h3>Item Ordered: {item.title}</h3>
                                                <h3>Item Description: {item.description}</h3>
                                                <h3>Item Quantity: {item.quantity}</h3>
                                                <h3>Item Price: {item.price}</h3>
                                            </div>
                                        )
                                    }
                                    )}
                                    <h3>Total =  ${order.total}</h3>

                                </div>
                            )
                        })}
                        </Grid> */}

                    <Divider style={{ width: "90vw" }} />
                </Box>
            )
            }


        </div >
    )
}

export default UserProfile;


{/* <Grid container>
<Grid item sm={12} lg={4}>{userInfo.user.username}</Grid>
<Grid item sm={12} lg={8}>
    {userOrders.length && userOrders.map(order => {
        return (
            <div>
                <h3>Order # =  {order.id}</h3>
                    {order.order_items.map(item =>{
                        return(
                        <div>
                            <h3>Item Ordered: {item.title}</h3>
                            <h3>Item Description: {item.description}</h3>
                            <h3>Item Quantity: {item.quantity}</h3>
                            <h3>Item Price: {item.price}</h3>
                        </div>
                    )}
                    )}
                <h3>Total =  ${order.total}</h3>
                
            </div>
        )
    })}
</Grid>

</Grid>
)} */}
