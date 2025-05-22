import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import Axios from 'axios'
import Image from './image';
export default function Menu() {
    const [Protions, setProtions] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [ProtionUpdateState, setProtionUpdateState] = useState(false)
    const [Protion, setProtion] = useState([]);
    const [MyUpdatProtion, SetMyUpdatProtion] = useState([])


    const getProtions = async () => {
        try {
            console.log("data");
            const { data } = await Axios.get("http://localhost:1233/api/Portion")
            console.log(data);
            setProtions(data)
        }
        catch (ex) {
            console.log(ex);

            // <Button icon="pi pi-user-plus" label="Add User" onClick={()=>addUserEzer()} />
        }
    }
    const deletProtion = async (id) => {
        try { 
            const { data } = await Axios.delete(`http://localhost:1233/api/Protion/${id}`)
            getProtions()
        }
        catch (ex) {
            console.log(ex);
        }
    }

    const updateProtionEzer = (Protion) => {
        SetMyUpdatProtion(Protion)
        setProtionUpdateState(true)
    }

    const addProtionEzer = () => {
        SetMyUpdatProtion({})
        setProtionUpdateState(true)
    }

    useEffect(() => {
        getProtions()
    }, []);

    const getSeverity = (Protion) => {
        switch (Protion.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (Protion, index) => {
        return (
            <div className="col-12" key={Protion.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1233${Protion.image}`} alt={Protion.image} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{Protion.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{Protion.category}</span>
                                </span>
                                <Tag value={Protion.inventoryStatus} severity={getSeverity(Protion)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{Protion.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (Protion, index) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" >
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{Protion.category}</span>
                        </div>
                        {/* <Tag value={Protion.inventoryStatus} severity={getSeverity(Protion)}></Tag> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:1233${Protion.image}`} alt={Protion.name} />
                        <div className="text-2xl font-bold">{Protion.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{Protion.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button> 
                        <Button icon="pi pi-refresh" label="Update" onClick={() => { updateProtionEzer(Protion) }}></Button>
                        <Button icon="pi pi-times" label="Delete" onClick={() => { deletProtion(Protion._id) }}></Button>

                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (Protion, layout, index) => {
        if (!Protion) {
            return;
        }

        if (layout === 'list') return listItem(Protion, index);
        else if (layout === 'grid') return gridItem(Protion);
    };

    const listTemplate = (Protions, layout) => {
        return <div className="grid grid-nogutter">{Protions.map((Protion, index) => itemTemplate(Protion, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">{
            ProtionUpdateState ? <Image ProtionUpdateState={ProtionUpdateState} getProtions={getProtions} setProtionUpdateState={setProtionUpdateState} MyUpdatProtion={MyUpdatProtion}></Image> :
                <><div className="card flex justify-content-center"> <Button icon="pi pi-plus" label="Add Protion" onClick={() => addProtionEzer()} /></div> <DataView value={Protions} listTemplate={listTemplate} layout={layout} header={header()} /></>
        }
        </div>
    )
}
