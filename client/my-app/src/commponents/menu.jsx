import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import Axios from 'axios'
import Image from './image';
import { setToken, setUser, setRole } from '../redux/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { Checkbox } from "primereact/checkbox";



export default function Menu() {
    const categoryOrder = ['On the table', 'salad', 'first course', 'main course', 'Extras', 'dessert'];

    const { token, role, user } = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const [Protions, setProtions] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [ProtionUpdateState, setProtionUpdateState] = useState(false)
    const [Protion, setProtion] = useState([]);
    const [MyUpdatProtion, SetMyUpdatProtion] = useState([])
    // const [checkedItems, setCheckedItems] = useState({});
    const [checkedItemsByCategory, setCheckedItemsByCategory] = useState({});

    const getProtions = async () => {
        try {
            console.log("data");
            const { data } = await Axios.get("http://localhost:1233/api/Portion")
            console.log(data);
            setProtions(data)
        }
        catch (ex) {

            <Button icon="pi pi-plus" label="Add Portion" onClick={() => addProtionEzer()} />
        }
    }
    const deletProtion = async (Protion) => {
        try {
            console.log(JSON.stringify(Protion.image[0]));
            await Axios.delete('http://localhost:1233/api/Portion/delete-image', {
                data: { url: Protion.image[0] },
                headers: { 'Content-Type': 'application/json' }
            });
            const { data } = await Axios.delete(`http://localhost:1233/api/Portion/${Protion._id}`)
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


    const groupByCategory = (items) => {
        // יוצרת אובייקט שבו כל מפתח הוא קטגוריה והערך הוא מערך של מנות באותה קטגוריה
        return items.reduce((groups, item) => {
            const category = item.category || 'ללא קטגוריה'; // אם אין קטגוריה, תן שם ברירת מחדל
            if (!groups[category]) groups[category] = [];    // אם עדיין אין מערך לקטגוריה, צור אותו
            groups[category].push(item);                      // הוסף את המנה למערך של הקטגוריה
            return groups;
        }, {});
    };

    const listTemplate = (Protions, layout) => {
        const grouped = groupByCategory(Protions); // קיבוץ כל המנות לפי קטגוריה
        console.log(grouped);
        return (
            <div>
                {categoryOrder.map(category =>
                grouped[category] && grouped[category].length > 0 && (
                    <div key={category}>
                        <h3 style={{ marginTop: '2rem', color: "#fba661", backgroundColor: "#61dafb" }}>{category}</h3>
                        <div className="grid grid-nogutter">
                            {grouped[category].map((Protion, index) => itemTemplate(Protion, layout, index))}
                        </div>
                    </div>
                )
            )}
            </div>
        );
    };

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




    const handleCheck = (category, protionId, checked) => {
        setCheckedItemsByCategory(prev => {
            const prevChecked = prev[category] || [];

            if (checked) {
                if (prevChecked.length >= 3) {
                    return prev;
                }
                return {
                    ...prev,
                    [category]: [...prevChecked, protionId]
                };
            } else {
                return {
                    ...prev,
                    [category]: prevChecked.filter(id => id !== protionId)
                };
            }
        });
    };


    const listItem = (Protion, index) => {
        return (
            <div className="col-12" key={Protion.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${Protion.image[0]}`} alt={Protion.image[0]} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{Protion.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{Protion.category}</span>
                                </span>
                                {/* <Tag value={Protion.inventoryStatus} severity={getSeverity(Protion)}></Tag> */}
                                {/* //הקטן */}
                            </div>
                            <span className="text-2xl font-semibold">{Protion.price}₪</span>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">

                            {token && role === "Admin" ?
                                    <><Button icon="pi pi-refresh" label="Update" onClick={() => { updateProtionEzer(Protion) }}></Button>
                                        <Button icon="pi pi-times" label="Delete" onClick={() => { deletProtion(Protion) }}></Button></>:<></>}
                            {token?<>
                                <div className="card flex justify-content-center">
                                    <label htmlFor="ingredient1" className="ml-2">Choose me: 👍</label>
                                    <Checkbox
                                        // onChange={  e => {setCheckedItems( prev => ({ ...prev, [Protion._id]: e.checked }) ) 
                                        // console.log(checkedItems);}}
                                        // checked={!!checkedItems[Protion._id]}
                                        onChange={e => handleCheck(Protion.category, Protion._id, e.checked)}
                                        checked={checkedItemsByCategory[Protion.category]?.includes(Protion._id) || false}
                                        disabled={
                                            !checkedItemsByCategory[Protion.category]?.includes(Protion._id) &&
                                            (checkedItemsByCategory[Protion.category]?.length >= 3)
                                        }
                                    />
                                </div></>
                                 :<></>}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (Protion, index) => {
        console.log(Protion);
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" >
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <div className="text-2xl font-bold">{Protion.name}</div>
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{Protion.category}</span>
                        </div>
                        {/* <Tag value={Protion.inventoryStatus} severity={getSeverity(Protion)}></Tag> */}
                    </div>

                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${Protion.image[0]}`} alt={Protion.name[0]} />
                        <span className="text-2xl font-semibold">{Protion.price}₪</span>
                    </div>
                    <div className="flex align-items-center justify-content-between">

                    {token && role === "Admin" ?
                                    <><Button icon="pi pi-refresh" label="Update" onClick={() => { updateProtionEzer(Protion) }}></Button>
                                        <Button icon="pi pi-times" label="Delete" onClick={() => { deletProtion(Protion) }}></Button></>:<></>}
                            {token?<>
                                <div className="card flex justify-content-center">
                                    <label htmlFor="ingredient1" className="ml-2">Choose me: 👍</label>
                                    <Checkbox
                                        // onChange={  e => {setCheckedItems( prev => ({ ...prev, [Protion._id]: e.checked }) ) 
                                        // console.log(checkedItems);}}
                                        // checked={!!checkedItems[Protion._id]}
                                        onChange={e => handleCheck(Protion.category, Protion._id, e.checked)}
                                        checked={checkedItemsByCategory[Protion.category]?.includes(Protion._id) || false}
                                        disabled={
                                            !checkedItemsByCategory[Protion.category]?.includes(Protion._id) &&
                                            (checkedItemsByCategory[Protion.category]?.length >= 3)
                                        }
                                    />
                                </div></>
                                 :<></>}
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

    // const listTemplate = (Protions, layout) => {
    //     return <div className="grid grid-nogutter">{Protions.map((Protion, index) => itemTemplate(Protion, layout, index))}</div>;
    // };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">{
            ProtionUpdateState ? <Image ProtionUpdateState={ProtionUpdateState} getProtion={getProtions} setProtionUpdateState={setProtionUpdateState} MyUpdatProtion={MyUpdatProtion}></Image> :
                <><div className="card flex justify-content-center"> {role === "Admin" ? <Button icon="pi pi-plus" label="Add Protion" onClick={() => addProtionEzer()} /> : <></>}</div> <DataView value={Protions} listTemplate={listTemplate} layout={layout} header={header()} /></>
        }
        </div>
    )
}
