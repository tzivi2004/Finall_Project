
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Axios from "axios"
import { Dialog } from "primereact/dialog"
import { AutoComplete } from 'primereact/autocomplete';
import { Editor } from "primereact/editor";
import { useSelector } from 'react-redux';

const AddOrder = ({ visible, getAllOrders, value, checkedItemsByCategory, setOrderUpdateState, OrderUpdateState, setOrder, Order, SetMyUpdatOrder, MyUpdatOrder, getOrder }) => {

    const [formData, setFormData] = useState({});

    const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
    const [value1, setValue1] = useState(MyUpdatOrder?.EventType || '');
    const [value2, setValue2] = useState(MyUpdatOrder?.PaymentMethod || '');
    const [value3, setValue3] = useState(MyUpdatOrder?.status || '');


    const [text, setText] = useState(MyUpdatOrder?.Notes || '');
    const { role, token } = useSelector((state) => state.token);


    const defaultValues = {
        userName: MyUpdatOrder?.user?.username || '',
        doses: MyUpdatOrder?.doses || [],
        NumberOfDiners: value,
        totalPrice: value >= 60 ? value * 64 : value * 74,
        status: MyUpdatOrder?.status || 'Pending',
        HallAddress: MyUpdatOrder?.HallAddress || '',
        HallName: MyUpdatOrder?.HallName || '',
        EventDate: MyUpdatOrder?.EventDate || '',
        StartEventTime: MyUpdatOrder?.StartEventTime || '',
        EventType: MyUpdatOrder?.EventType || '',
        Notes: MyUpdatOrder?.Notes || '',
        PaymentStatus: MyUpdatOrder?.PaymentStatus || 'Unpaided',
        PaymentMethod: MyUpdatOrder?.PaymentMethod || '',
    };


    useEffect(() => {
        console.log(checkedItemsByCategory);
        console.log("value", value);
        console.log("MyUpdatOrder", MyUpdatOrder);
        console.log(role === "Admin" ? "Admin" : "User");


    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addOrder = async (datas) => {
        console.log("|iiiiii'", datas);

        const doses = []
        for (const [category, items] of Object.entries(checkedItemsByCategory)) {
            //  if (!Array.isArray(items)) continue;
            const quantity = Math.floor(value / items.length); // חישוב הכמות

            // הוסף כל פריט בקטגוריה ל-doses
            items.forEach((itemId) => {
                doses.push({
                    dose: itemId, // ה-ID של המנה
                    quantity: quantity, // הכמות המחושבת
                });
            });


        } try {


            const res = await Axios.get(`http://localhost:1233/api/User/userName${datas.userName}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log("res.data", res.data);

            const order = {
                user: res.data._id,
                doses: doses,
                NumberOfDiners: value,
                totalPrice: value >= 60 ? value * 64 : value * 74,
                HallAddress: datas.HallAddress,
                HallName: datas.HallName,
                EventDate: datas.EventDate,
                StartEventTime: datas.StartEventTime,
                EventType: value1,
                Notes: text,
                // PaymentStatus: datas.PaymentStatus,
                PaymentMethod: value2
            }
            console.log(order);



            const { data } = await Axios.post("http://localhost:1233/api/Order", order,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            // setPost([...Post, res.data])בגלל ה sort!!!
            console.log(data)
            console.log(OrderUpdateState);
            // getOrder()
            setOrderUpdateState(false)
            console.log(OrderUpdateState);

        }
        catch (ex) {

        }
    }

    const UpdateOrder = async (datas) => {
        try {
            const res = await Axios.get(`http://localhost:1233/api/User/userName${datas.userName}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log("res.data", res.data);
            datas.Notes = text;
            datas.EventType = value1;
            datas.PaymentMethod = value2;
            datas.doses = MyUpdatOrder.doses;
            datas.user = res.data._id;
            datas._id = MyUpdatOrder._id;
            console.log("value3", value3);

            datas.status = value3;
            console.log("datas", datas);

            const { data } = await Axios.put("http://localhost:1233/api/Order", datas,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log("data", data);
            console.log("datas", datas);


            // 
            console.log("OrderUpdateState", OrderUpdateState);

            setOrderUpdateState(false)
            console.log("setOrderUpdateState", setOrderUpdateState);
            getAllOrders()
        }
        catch (ex) {

        }
    }

    const onSubmit = (data) => {
        console.log(data);
        setFormData(data);
        reset();
        console.log("data", data);

        console.log("MyUpdatOrder", MyUpdatOrder);
        if (MyUpdatOrder.doses) {
            UpdateOrder(data)
        } else {
            addOrder(data)
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const search = (event) => {

        // let filtered = products.filter(
        //   (product) => product.name.toLowerCase().includes(query)

        let query = event.query ? event.query.toLowerCase() : '';
        let _items = ['Bar Mitzvah', 'Bat Mitzvah', 'Wedding', 'Birthday', 'Shabat', 'Brit', "Other"];
        let filtered = _items.filter(item => item.toLowerCase().includes(query))
        setAutoCompleteSuggestions(filtered);
    }
    const searchPaymentMethod = (event) => {

        // let filtered = products.filter(
        //   (product) => product.name.toLowerCase().includes(query)

        let query = event.query ? event.query.toLowerCase() : '';
        let _items = ['Credit Card', 'Cash', 'Bank Transfer'];
        let filtered = _items.filter(item => item.toLowerCase().includes(query))
        setAutoCompleteSuggestions(filtered);
    }
    const searchStatus = (event) => {

        // let filtered = products.filter(
        //   (product) => product.name.toLowerCase().includes(query)

        let query = event.query ? event.query.toLowerCase() : '';
        let _items = ['Pending', 'In Progress', 'Completed'];
        let filtered = _items.filter(item => item.toLowerCase().includes(query))
        setAutoCompleteSuggestions(filtered);
    }

    return (


        <div className="form-demo" >
            <Dialog visible={OrderUpdateState} onHide={() => { setOrderUpdateState(false) }}>
                <div className="flex justify-content-center" >
                    <div className="card">
                        <h5 className="text-center"></h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">
                                <h1>Enter the details of your order: </h1>
                                <span className="p-float-label">
                                    <Controller name="userName" control={control} rules={{ required: 'name is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="userName" className={classNames({ 'p-error': errors.name })}>{"UserName*"}</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>
                            {/* 
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="category" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{"doses"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div> */}

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="HallAddress" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="HallAddress" >{"HallAddress"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="HallName" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="HallName" >{"HallName"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="EventDate" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{"EventDate"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="StartEventTime" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{"StartEventTime"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>
                            <div className="field">
                                <div className="card flex justify-content-center">
                                    <Controller name="EventType" control={control} render={({ field, fieldState }) => (

                                        <AutoComplete value={value1} suggestions={autoCompleteSuggestions} completeMethod={search} onChange={(e) => setValue1(e.value)} placeholder="EventType" dropdown />
                                    )} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="card flex justify-content-center">
                                    <AutoComplete value={value2} suggestions={autoCompleteSuggestions} completeMethod={searchPaymentMethod} onChange={(e) => setValue2(e.value)} placeholder="PaymentMethod" dropdown />
                                </div>
                            </div>
                            {role === "Admin" ? <div className="field">
                                <div className="card flex justify-content-center">
                                    <AutoComplete value={value3} suggestions={autoCompleteSuggestions} completeMethod={searchStatus} onChange={(e) => setValue3(e.value)} placeholder="Status" dropdown />
                                </div>
                            </div> : <></>}
                            <div> If you have some notes:</div>
                            <Editor value={text} onTextChange={(e) => setText(e.textValue)} style={{ height: '320px' }} />
                            <div className="field"></div>
                            <div className="field">
                                <label htmlFor="price" >{` The total price is : ${value >= 60 ? value * 64 : value * 74}₪`}</label>
                                {getFormErrorMessage('body')}
                            </div>
                            <Button type="submit" label={"Save!!!"} className="mt-2" />
                        </form>
                    </div>
                </div>
            </Dialog> </div>

    );

}

export default AddOrder
