import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import Axios from "axios"
import addProduct from './addProduct';
import AddProduct from './addProduct';
// import { deletProduct } from '../../../../server/controller/ControllerProduct';

export default function ProductsInStock() {
    const [Product, setProduct] = useState([]);
    const [MyUpdatProduct, SetMyUpdatProduct] = useState([])
    const [ProductUpdateState, setProductUpdateState] = useState(false)


    const getProduct = async () => {
        try {
            const { data } = await Axios.get("http://localhost:1233/api/Product")
            setProduct(data)
        }
        catch (ex) {
            console.log(ex);

            <Button icon="pi pi-plus" label="Add Product" onClick={() => addProductEzer()} />
        }
    }

    const deletProduct = async (id) => {
        try { 
            const { data } = await Axios.delete(`http://localhost:1233/api/Product/${id}`)
            getProduct()
        }
        catch (ex) {
            console.log(ex);
        }
    }

        const updateProductEzer = (Product) => {
        SetMyUpdatProduct(Product)
        setProductUpdateState(true)
    }

    const addProductEzer = () => {
        SetMyUpdatProduct({})
        setProductUpdateState(true)
    }
    
    useEffect(() => {
        getProduct()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getSeverity = (product) => {

        if (product.QuantityInStock > 7)
            return 'success';

        if (product.QuantityInStock > 0)
            return 'warning';

        else
            return 'danger';

    }


    const itemTemplate = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                                <div className="text-700">{data.description}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">${data.price}</span>
                            <Button icon="pi pi-refresh" label="Update" onClick={() =>{updateProductEzer(data)}}></Button>
                            <Button icon="pi pi-times" label="Delete" onClick={() =>{deletProduct(data._id)}} disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            <Tag value={` The Count Of This Product Is: ${data.QuantityInStock}`} severity={getSeverity(data)}></Tag>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="card">{

                ProductUpdateState ? <AddProduct ProductUpdateState={ProductUpdateState} getProduct={getProduct} setProductUpdateState={setProductUpdateState} MyUpdatProduct={MyUpdatProduct}></AddProduct> :
                    <><div className="card flex justify-content-center"> <Button icon="pi pi-plus" label="Add Product" onClick={() => addProductEzer()} /></div><DataScroller value={Product} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" /> </>

                //  setProductUpdateState?<addProduct ></addProduct>:
                // <><div className="card flex justify-content-center"> <Button icon="pi " label="Add New Product"  /></div>
                // <DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" /></>
            }
            </div></>
    )
}
