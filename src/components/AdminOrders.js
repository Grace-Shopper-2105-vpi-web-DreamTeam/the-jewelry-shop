import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


const AdminOrders = ({ allOrders }) => {
    const columns = [
        { field: "order_item_id", hide: true },
        {
            field: "description",
            headerName: "Descriptions",
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
                <Box sx={{ p: 2, border: '1px white', textAlign: "center" }}>
                    <Paper
                        sx={{
                            position: 'relative',
                            backgroundColor: '#dccdc6',
                            color: 'black',
                            mb: 4,    
                        }}
                    >
                        <Typography variant="h4">
                            <br></br>
                            Loops & Strings Order History
                            <br></br>
                            <br></br>
                        </Typography>
                    </Paper>
                </Box>

            </div>
            <div style={{ height: '100%', width: "100%" }}>
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



export default AdminOrders;
