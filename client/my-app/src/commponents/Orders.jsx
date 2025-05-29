import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import Axios from 'axios';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AddOrder from './MakAnOrder';


export default function Order() {
    const [order, setOrder] = useState([]);
    // const [user, setUser] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    // const { token } = useSelector((state) => state.token)
    const toast = useRef(null);
    const { token, role, user } = useSelector((state) => state.token);
    const [OrderUpdateState, setOrderUpdateState] = useState(false)
    const [currentOrder, setCurrentOrder] = useState(null);

    // ,{header:`Bearer ${token}`}
    const getAllOrders = async () => {
        try {
            const { data } = await Axios.get("http://localhost:1233/api/Order",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setOrder(data)
            console.log(data);
        }
        catch (ex) {
            console.log(ex);

            // <Button icon="pi pi-plus" label="Add Product" onClick={() => addProductEzer()} />
        }
    }

    const downloadExcel = () => {
        const flatOrders = flattenOrders(order); // המרה למבנה שטוח
        const worksheet = XLSX.utils.json_to_sheet(flatOrders); const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders'); // הוספת הגיליון לחוברת העבודה

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'Orders.xlsx'); // שמירת הקובץ
    };

    const flattenOrders = (orders) => {
        const flat = [];
        orders.forEach(order => {
            if (order.doses && order.doses.length > 0) {
                order.doses.forEach(dose => {
                    flat.push({
                        OrderID: order._id,
                        User: order.user?.name || "",
                        EventType: order.EventType,
                        HallName: order.HallName,
                        HallAddress: order.HallAddress,
                        EventDate: new Date(order.EventDate).toLocaleDateString('he-IL'),
                        StartEventTime: order.StartEventTime,
                        Notes: order.Notes,
                        NumberOfDiners: order.NumberOfDiners,
                        TotalPrice: order.totalPrice,
                        Status: order.status,
                        DoseName: dose.dose?.name || "",
                        DoseQuantity: dose.quantity
                    });
                });
            } else {
                // אם אין מנות, עדיין נוסיף שורה להזמנה
                flat.push({
                    OrderID: order._id,
                    User: order.user?.name || "",
                    EventType: order.EventType,
                    HallName: order.HallName,
                    HallAddress: order.HallAddress,
                    EventDate: new Date(order.EventDate).toLocaleDateString('he-IL'),
                    StartEventTime: order.StartEventTime,
                    Notes: order.Notes,
                    NumberOfDiners: order.NumberOfDiners,
                    TotalPrice: order.totalPrice,
                    Status: order.status,
                    DoseName: "",
                    DoseQuantity: ""
                });
            }
        });
        return flat;
    };

    const getYorsOrders = async () => {
        try {
            console.log("user", user.username);

            const { data } = await Axios.get(`http://localhost:1233/api/Order/username/${user.username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setOrder(data)
            console.log(data);
        }
        catch (ex) {
            console.log(ex);

            // <Button icon="pi pi-plus" label="Add Product" onClick={() => addProductEzer()} />
        }
    }

    useEffect(() => {
        { role === "Admin" ? getAllOrders() : role === "User" ? getYorsOrders() : <></> }
        // getAllOrders()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const expandAll = () => {
        let _expandedRows = {};

        order.forEach((p) => (_expandedRows[`${p._id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'ILS' });
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} severity={getOrderSeverity(rowData)}></Tag>;
    };


    const updateOrder = (rowData) => {
        console.log("update order", rowData);
        setOrderUpdateState(true);
        console.log("update order", rowData);
        console.log("order.doses", rowData.doses);
        setCurrentOrder(rowData);

        // Navigate to the update order page with the order ID

    }
    const searchBodyTemplate = (rowData) => {
        return <Button icon="pi pi-refresh" onClick={() => { updateOrder(rowData) }} />;
    };

    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} width="64px" className="shadow-4" />;
    // };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.totalPrice);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.status} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getOrdereverity(rowData)}></Tag>;
    };

    const getOrdereverity = (product) => {
        switch (product.status) {
            case 'Completed':
                return 'success';

            case 'In Progress':
                return 'warning';

            case 'Pending':
                return 'danger';

            default:
                return null;
        }
    };

    const getOrderSeverity = (order) => {
        switch (order.status) {
            case 'DELIVERED':
                return 'success';

            case 'CANCELLED':
                return 'danger';

            case 'PENDING':
                return 'warning';

            case 'RETURNED':
                return 'info';

            default:
                return null;
        }
    };

    const allowExpansion = (rowData) => {
        return rowData.doses.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        console.log(data);
        return (
            <div className="p-3">
                <h5>Orders for {data.user.name}</h5>
                <DataTable value={data.doses}>
                    <Column field="dose.name" header="name" body={data.doses.dose} sortable></Column>
                    <Column field="quantity" header="quantity" sortable></Column>
                    {/* <Column field="amount" header="Amount" body={amountBodyTemplate} sortable></Column> */}
                    {/* <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></Column> */}
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
    );

    return (
        <div className="card">{OrderUpdateState ? <AddOrder OrderUpdateState={OrderUpdateState} checkedItemsByCategory={currentOrder.doses} value={currentOrder.NumberOfDiners} setOrderUpdateState={setOrderUpdateState} MyUpdatOrder={currentOrder} getAllOrders={getAllOrders}></AddOrder> :
            <><div>
                <Button icon="pi pi-upload" label="Uplode to Excel " onClick={downloadExcel}></Button>
            </div>
                <Toast ref={toast} />
                <DataTable value={order} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="_id" header={header} tableStyle={{ minWidth: '60rem' }}>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="user.name" header="User" sortable />
                    {/* <Column header="Image" body={imageBodyTemplate} /> */}
                    <Column field="totalPrice" header="Total Price" sortable body={priceBodyTemplate} />
                    <Column field="StartEventTime" header="Start Event Time" sortable />
                    {/* <Column field="rating" header="Reviews" sortable body={ratingBodyTemplate} /> */}
                    {/* <Column field="date" header="Date" sortable></Column> */}
                    <Column field="EventType" header="Event Type" sortable />
                    <Column field="HallName" header="Hall Name" sortable />
                    <Column field="HallAddress" header="Hall Address" sortable />
                    <Column field="EventDate" header="Event Date" sortable body={rowData => new Date(rowData.EventDate).toLocaleDateString('he-IL')} />

                    <Column field="Notes" header="Notes" sortable />
                    <Column field="NumberOfDiners" header="Number of Diners" sortable />
                    {/* <Column field="StartEventTime" header="Start Event Time" sortable /> */}
                    {/* <Column field="amount" header="Amount" body={amountBodyTemplate} sortable /> */}
                    <Column field="status" header="Status" sortable body={statusBodyTemplate} />
                   { role==="Admin"?<Column header="Update" headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column>:<></>}

                </DataTable>

            </>
        }
        </div >
    );
}
