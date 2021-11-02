import React from 'react'
import Grid from '@mui/material/Grid';

const UserProfile = ({ userOrders, userInfo }) => {
    return (
        <div>
            {userInfo.user && (
                <Grid container>
                    <Grid item sm={12} lg={4}>{userInfo.user.username}</Grid>
                    <Grid item sm={12} lg={8}>
                        {userOrders && userOrders.map(order => {
                            return (
                                <div>
                                    <h3>Order # =  {order.id}</h3>
                                    <div>
                                        {order.order_items.map(item =>{
                                            return
                                            <div>
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </Grid>

                </Grid>
            )}

        </div>
    )
}

export default UserProfile;
