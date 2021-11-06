import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";


const AdminOrders = ({ allOrders}) => {
    const columns = [
        { field: "order_item_id", hide: true },
        {
            field: "description",
            headerName: "Descriptions",
            width: 250
        },
        {
            field: "price",
            headerName: "Unit price",
            width: 100
        },
        {
            field: "quantity",
            headerName: "Ordered quantity",
            width: 100
        }
    ];

    return (
        <div style={{ height:'100%', width: "100%" }}>
            <h2>Testing</h2>
            {allOrders.map((singleOrder) => (
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
                                bgcolor: "yellow",
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
                                <h3>Total: {singleOrder.total}</h3>
                            </div>
                        </Box>
                        <Box style={{ height:'30vh', width: "100%", backgroundColor:"red" }}>
                            <h8>Order details </h8>
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
    );
}



export default AdminOrders;
// import React from 'react'

// const AdminOrders = ({ allOrders }) => {



//     return (
//         <div>
//             {
//                 allOrders.map(order => (
//                     <div key={order.id}>
//                         <h3>Order # =  {order.id}</h3>
//                         {order.order_items.map(item => {
//                             return (
//                                 <div>
//                                     <h3>Item Ordered: {item.title}</h3>
//                                     <h3>Item Description: {item.description}</h3>
//                                     <h3>Item Quantity: {item.quantity}</h3>
//                                     <h3>Item Price: {item.price}</h3>
//                                 </div>
//                              )}
//                              )}
//                          <h3>Total =  ${order.total}</h3>
                         
//                      </div>
//                  )
//              )}
//          </div>
//                 )
// }

//             export default AdminOrders