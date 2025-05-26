import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import Axios from 'axios';
import { useSelector } from 'react-redux';

export default function Order() {
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const { token } = useSelector((state) => state.token)
    const toast = useRef(null);

    // ,{header:`Bearer ${token}`}
    const getAllOrders = async () => {
        try {
            const { data } = await Axios.get("http://localhost:1233/api/Order")
            setOrder(data)
            console.log(data);
        }
        catch (ex) {
            console.log(ex);

            // <Button icon="pi pi-plus" label="Add Product" onClick={() => addProductEzer()} />
        }
    }
    useEffect(() => {
        getAllOrders()
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
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} severity={getOrderSeverity(rowData)}></Tag>;
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-refresh" />;
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
        return <Tag  value={rowData.status} severity={getOrdereverity(rowData)}></Tag>;
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
        <div className="card">
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
                <Column field="EventDate" header="Event Date" sortable />

                <Column field="Notes" header="Notes" sortable />
                <Column field="NumberOfDiners" header="Number of Diners" sortable />
                {/* <Column field="StartEventTime" header="Start Event Time" sortable /> */}
                {/* <Column field="amount" header="Amount" body={amountBodyTemplate} sortable /> */}
                <Column field="status" header="Status" sortable body={statusBodyTemplate} />
                <Column header="Update" headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column>

            </DataTable>
        </div>
    );
}
