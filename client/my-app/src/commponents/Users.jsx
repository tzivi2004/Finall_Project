import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import Axios from "axios"
import { useSelector } from 'react-redux';


export default function User() {
    const [products, setProducts] = useState([]);
    const { token } = useSelector((state) => state.token);
    const getusers = async () => {
        try {
            const { data } = await Axios.get("http://localhost:1233/api/User",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setProducts(data)
            console.log(data);
        }
        catch (ex) {
            console.log(ex);


        }
    }
    useEffect(() => {
        getusers()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    const itemTemplate = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                                <div className="text-2xl font-bold text-900">{data.username}</div>
                                <div className="text-700">{data.email}</div>
                            </div>
                            <div className="flex flex-column gap-2">

                                <span className="flex align-items-center gap-2">

                                    <span className="font-semibold">{data.roles}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">

                            <Button icon="pi pi-shopping-cart" label="apdate user" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataScroller value={products} itemTemplate={itemTemplate} rows={5} buffer={0.4} header="List of Products" />
        </div>
    )
}





