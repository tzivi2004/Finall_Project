import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
// import { ProductService } from './service/ProductService';
import Axios from "axios"


export default function Menu() {

    // const [user,setUser] = useState([])

    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    const getProducts = async ()=> {
        try{
        const {data} = await Axios.get("http://localhost:1233/api/Portion")
    console.log(data);
    setSource(data)
    }
        catch(ex){
            console.log(ex);

            // <Button icon="pi pi-user-plus" label="Add User" onClick={()=>addUserEzer()} />
        }
    }

    useEffect(() => {
        getProducts()
        // ProductService.getProductsSmall().then((data) => setSource(data));
    }, []);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.image} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.price}</span>
            </div>
        );
    };

    return (
        <div className="card">
            <PickList dataKey="id" source={source} target={target} onChange={onChange} itemTemplate={itemTemplate} filter filterBy="name" breakpoint="1280px"
                sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }}
                sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" />
        </div>
    );
}
        