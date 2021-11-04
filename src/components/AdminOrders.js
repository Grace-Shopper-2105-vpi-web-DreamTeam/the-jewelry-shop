import React from 'react'

const AdminOrders = ({ allOrders }) => {



    return (
        <div>
            {
                allOrders.map(order => (
                    <div key={order.id}>
                        <h3>Order # =  {order.id}</h3>
                        {order.order_items.map(item => {
                            return (
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
             )}
         </div>
                )
}

            export default AdminOrders