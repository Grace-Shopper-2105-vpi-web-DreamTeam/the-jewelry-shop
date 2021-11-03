import React from 'react'
import Grid from '@mui/material/Grid';

const UserProfile = ({ userOrders, userInfo }) => {
    return (
        <div>
            {userInfo.user && (
                <Grid container>
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
            )}

        </div>
    )
}

export default UserProfile;
